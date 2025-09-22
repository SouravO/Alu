import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert("Message sent!");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  const [userLocation, setUserLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps/embed?q=135/A,+GRACE+HOUSE,+AROOR,+VALLIKKAD,+Kondotty,+Malappuram,+Kerala,+673638&zoom=15"
  );

  // Get user's current location
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ latitude, longitude });
  //         setMapUrl(`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0PCsDA0JzI1LjAiTiA3NsKwNTgnMzAuMCJF!5e0!3m2!1sen!2sus!4v1620841125815!5m2!1sen!2sus&zoom=17`);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   }
  // }, []);

  return (
    <section className="min-h-screen bg-[#0a0a0a]  text-[#f8f8f8] flex flex-col py-16 px-4">
      <div className=" mx-auto w-full">
        <div className="flex items-center mb-8 ">
          <h1
            className="text-6xl font-bold text-[#f8f8f8]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Contact us
          </h1>
        </div>

        <p
          className="text-[#6e6e73] mb-12  text-xl max-w-2xl"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          We are always looking for ways to improve our products and services.
          Contact us and let us know how we can help you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-wrap md:flex-nowrap space-x-3 mb-10">
                <a
                  href="mailto:vpackgroups@gmail.com"
                  className="text-[#6e6e73] hover:text-[#c1d5e9]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  vpackgroups@gmail.com
                </a>
                <span className="text-[#6e6e73]">•</span>
                <a
                  href="tel:+919020229988"
                  className="text-[#6e6e73] hover:text-[#c1d5e9]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  +91 9020229988
                </a>
                <span className="text-[#6e6e73]">•</span>
                <a
                  href="https://goo.gl/maps/135/A,+GRACE+HOUSE,+AROOR,+VALLIKKAD,+Kondotty,+Malappuram,+Kerala,+673638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6e6e73] hover:text-[#c1d5e9]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Directions
                </a>
              </div>

              <div className="w-full max-w-md">
                <div className="relative mb-6 w-full">
                  <label
                    className="block text-[#f8f8f8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Full name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Smith"
                    className="w-full bg-[#f8f8f8] text-black border border-[#0a0a0a] rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6e6e73]"
                    required
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  />
                </div>

                <div className="relative mb-6 w-full">
                  <label
                    className="block text-[#f8f8f8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="vpackgroups@gmail.com"
                    className="w-full bg-[#f8f8f8] text-black border border-[#0a0a0a] rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6e6e73]"
                    required
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  />
                </div>

                <div className="relative mb-6 w-full">
                  <label
                    className="block text-[#f8f8f8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Company
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    type="text"
                    placeholder="Acme Co LLC"
                    className="w-full bg-[#f8f8f8] text-black border border-[#0a0a0a] rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6e6e73]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  />
                </div>

                <div className="relative mb-6 w-full">
                  <label
                    className="block text-[#f8f8f8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Type your message here"
                    className="w-full bg-[#f8f8f8] text-black border border-[#0a0a0a] rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6e6e73]"
                    required
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full py-3 rounded bg-[#f8f8f8] hover:bg-[#6e6e73] hover:text-white text-black font-medium text-lg transition"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0  opacity-40"></div>
            <div className="relative z-10 h-full">
              <div className="h-full flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="400"
                    className="w-full h-[400px] object-cover rounded-lg border border-[#1e3253]"
                    style={{ filter: "invert(0.85) hue-rotate(180deg)" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                  <div className="flex justify-center mt-6">
                    <div className="inline-flex items-center px-4 py-2 bg-[#6e6e73] border border-[#0a0a0a] rounded-full shadow-lg">
                      <span
                        className="text-[#c1d5e9] mr-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {userLocation
                          ? "Your current location"
                          : "VP GROUP, Kerala"}
                      </span>
                      <div className="w-3 h-3 bg-[#6e6e73] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
