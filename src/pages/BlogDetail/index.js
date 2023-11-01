import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../../blog-data.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
function copyToClipboard(text) {
  // Create a temporary textarea element to hold the text
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Append the textarea to the document
  document.body.appendChild(textArea);

  // Select the text in the textarea
  textArea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the temporary textarea from the document
  document.body.removeChild(textArea);
}

const Content = ({ mdxContent }) => {
  const content = [];
  let currentList = null;
  let inCodeBlock = false;
  let id = 0;
  const [isOver, setIsOver] = useState({});
  const [copied, setCopied] = useState({});
  const codeArray = [];
  const handleMouseOver = (e) => {
    const temp = e.target.id;
    const ID = temp[temp.length - 1];
    let proxy = { ...isOver };
    proxy[ID] = true;
    setIsOver(proxy);
  };
  const handleMouseOut = (e) => {
    const temp = e.target.id;
    const ID = temp[temp.length - 1];
    let proxy = { ...isOver };
    proxy[ID] = false;
    if (!copied[ID]) setIsOver(proxy);
    else
      setTimeout(async () => {
        setIsOver(proxy);
      }, 1000);
  };
  const handleCopyBTN = async (e) => {
    const temp = e.target.id;
    const ID = temp[temp.length - 1];
    copyToClipboard(codeArray[ID]);
    console.log(ID);
    setCopied({ [ID]: true });
    setTimeout(async () => {
      setCopied({ [ID]: false });
    }, 1300);
  };
  mdxContent.split("\n").forEach((line, index) => {
    if (inCodeBlock) {
      if (line.trim() === "```") {
        // End of code block
        codeArray.push(inCodeBlock.content.join("\n"));
        content.push(
          <div className="codeFormatter">
            <SyntaxHighlighter
              language="php"
              value={inCodeBlock.content.join("\n")}
              style={nightOwl}
              id={`codeFormatter${id}`}
              onMouseOver={(e) => handleMouseOver(e)}
              onMouseOut={(e) => handleMouseOut(e)}
            >
              {inCodeBlock.content.join("\n")}
            </SyntaxHighlighter>
            <div
              className={`copyBTN ${
                isOver[id] ? "copyBTN-show" : "copyBTN-hide"
              }`}
              id={`copyBTN${id}`}
              onMouseOver={(e) => !copied[id] && handleMouseOver(e)}
              onClick={(e) => handleCopyBTN(e)}
            >
              {copied[id] && isOver[id] ? (
                <img
                  src="/images/copied.svg"
                  id={`copyBTNImg${id}`}
                  className="copied"
                />
              ) : (
                <img
                  src="/images/copy.svg"
                  id={`copyBTNImg${id}`}
                  className="copy"
                />
              )}
            </div>
          </div>
        );
        inCodeBlock = false;
        id++;
      } else {
        inCodeBlock.content.push(line.trim());
      }
    } else if (line.match(/^```(\w+)?\s*$/)) {
      // Start of a code block
      const match = line.match(/^```(\w+)?\s*$/);
      inCodeBlock = {
        language: match[1] || "plaintext",
        content: [],
      };
    } else if (line.match(/^\s*"([^"]+)"\s*=\s*"([^"]+)"\s*;$/)) {
      // Handle key-value pairs
      const match = line.match(/^\s*"([^"]+)"\s*=\s*"([^"]+)"\s*;$/);
      content.push(
        <SyntaxHighlighter>
          `"{match[1]}" = "{match[2]}";`
        </SyntaxHighlighter>
      );
    } else if (line.startsWith("#")) {
      let count = 0;
      for (let i = 0; i < line.length; i++) if (line[i] == "#") count++;

      const format = line
        .slice(count + 1)
        .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>')
        .replace(
          /`([^`]+)`/g,
          '<code style="background-color: #707070;">$1</code>'
        ) // Inline code
        .replace(
          /\[([^[]+)]\(([^)]+)\)/g,
          '<a href="$2" style="font-weight: 600; color: rgb(106, 109, 236)">$1</a>'
        )
        .replace(/\_(.*?)\_/g, '<span style="font-style: italic">$1</span>');
      // Header 6 (e.g., "###### Your Header")
      const formattedLine = `<h${count} key={${index}}>${format}</h${count}>`;
      content.push(<div dangerouslySetInnerHTML={{ __html: formattedLine }} />);
    } else if (line.startsWith("- ")) {
      // List item (e.g., "- Item")
      if (!currentList) {
        currentList = [];
      }
      const formattedLine = line
        .slice(2)
        .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>')
        .replace(
          /`([^`]+)`/g,
          '<code style="background-color: #707070;">$1</code>'
        ) // Inline code
        .replace(
          /\[([^[]+)]\(([^)]+)\)/g,
          '<a href="$2" style="font-weight: 600; color: rgb(106, 109, 236)">$1</a>'
        )
        .replace(/\_(.*?)\_/g, '<span style="font-style: italic">$1</span>'); // Italic; // Add a class to the anchor tag

      currentList.push(
        <li key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    } else {
      if (currentList) {
        // If there was a list, wrap it in a <ul> element
        content.push(<ul key={index}>{currentList}</ul>);
        currentList = null;
      } else {
        // Check for specific formatting rules
        const formattedLine = line
          .replace(
            /\*\*(.*?)\*\*/g,
            '<span style="font-weight: bold;">$1</span>'
          ) // Bold text
          .replace(
            /```(.*?)\n(.*?)```/gs,
            '<pre class="code" style="background-color: #f0f0f0;"><code class="$1">$2</code></pre>'
          ) // Code block
          .replace(
            /`([^`]+)`/g,
            '<code style="background-color: #707070;">$1</code>'
          ) // Inline code
          .replace(
            /\[([^[]+)]\(([^)]+)\)/g,
            '<a href="$2" style="font-weight: 600; color: rgb(106, 109, 236)">$1</a>'
          )
          .replace(
            /\_\[(.*?)\]\_/g,
            '<span style="font-style: italic">$1</span>'
          ); // Italic
        content.push(
          <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
    }
  });
  useEffect(() => {
    // window.addEventListener("mousemove", (e) => {
    //   const codeRects = document.getElementsByClassName("codeFormatter");
    //   console.log(codeRects[0].getBoundingClientRect(), e.clientX, e.clientY);
    //   for (let i = 0; i < codeRects.length; i++) {
    //     if (
    //       !(
    //         e.clientX > codeRects[i].getBoundingClientRect().left &&
    //         e.clientX < codeRects[i].getBoundingClientRect().right &&
    //         e.clientY > codeRects[i].getBoundingClientRect().top &&
    //         e.clientY < codeRects[i].getBoundingClientRect().bottom
    //       )
    //     ) {
    //       // setCopied({false});
    //     }
    //   }
    // });
  }, []);

  return <div className="article-content">{content}</div>;
};
const BlogDetail = () => {
  const { id } = useParams();
  const [articleContent, setArticleContent] = useState("");
  const baseUrl = window.location.origin;
  const [blogData, setBlogData] = useState({});
  let date = "";
  useEffect(() => {
    const baseUrl = window.location.origin;
    fetch(`${baseUrl}/blog/${id}.mdx`)
      .then((response) => response.text())
      .then((mdxText) => setArticleContent(mdxText))
      .catch((error) => console.error("Error reading MDX file:", error));

    data.map((item) => {
      item.url == id && setBlogData(item);
    });
    window.addEventListener("resize", () => {
      // const w = document.getElementsByTagName();
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="article__container">
      <div className="article-content__container">
        <div className="article-content__header">
          <h2 className="title">{blogData.title}</h2>
          <div className="published-date">
            Published on {blogData.published} · {blogData.readtime} min read
          </div>
        </div>
        <Content mdxContent={articleContent} />
        <a onClick={() => handleClick()} className="upBTN">
          <img src={`${baseUrl}/images/up-arrow.png`} alt="" width={50} />
        </a>{" "}
      </div>
    </div>
  );
};
export default BlogDetail;
