import React, { useState } from "react";
import "./Banner.scss";
import bannerRectangle from "../../../assets/patterns/bannerRectangle.png";
import { NavLink } from "react-router-dom";
import { createContactSubmission } from "../../../api";

const EMPTY_FORM = { fullName: "", email: "", phone: "", message: "" };

const Banner = ({ content }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      await createContactSubmission(form);
      setForm(EMPTY_FORM);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="banner"
      // Falls back to the stylesheet's background when the CMS has no image.
      style={
        content?.bannerImage
          ? { backgroundImage: `url(${content.bannerImage})` }
          : undefined
      }
    >
      <div className="overlay"></div>
      <div className="bannerForm">
        <img src={bannerRectangle} alt="" className="contentPatternTop" />
        <img src={bannerRectangle} alt="" className="contentPatternBottom" />
        <div className="bannerContactForm">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Name Surname"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
            />
            <button type="submit" disabled={status === "sending"}>
              <span className="icon">→</span>
              <span className="text">
                {status === "sending" ? "Sending..." : "Send Message"}
              </span>
            </button>
            {status === "sent" && (
              <p className="formFeedback formSuccess" role="status">
                Thank you, your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="formFeedback formError" role="alert">
                Message could not be sent. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="bannerContent">
        <h1>{content?.bannerHeading}</h1>
        <h4>{content?.bannerSubheading}</h4>
        <NavLink  to="/contact">
          <span className="icon">→</span>
          <span className="text">Now Contact Us</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Banner;
