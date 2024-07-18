import React from "react";

const TableOfContent = ({ postContent }) => {
  // Regex to find headings (<h1>, <h2>, <h3>, <h4>, <h5>, <h6>)
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;
  const headings = [];

  // Extract headings from post content
  let match;
  while ((match = headingRegex.exec(postContent)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2];
    headings.push({ level, text });
  }

  const handleClick = (index) => {
    console.log("Button clicked:", index);
    const headingElement = document.getElementById(`heading-${index}`);
    console.log("Heading element:", headingElement);
    if (headingElement) {
      const yOffset = -100; // Adjust this value if needed
      const y =
        headingElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      console.log("Scrolling to y offset:", y);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="table-of-contents " style={{width:'77%'}}>
      <h3 style={{ marginLeft: "10px", marginBottom: "10px" }}>
        Table of Contents
      </h3>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(index)}
              className={`heading-${heading.level}`}
              style={{
                fontFamily: "raleway",
                fontWeight: "500",
                marginLeft: "10px",
                marginBottom: "10px",
                textAlign: "left"
              }}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;
