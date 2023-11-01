import React, { useEffect, useRef, useState } from "react";
import searchData from "../../faq.json";
import Collapsible from "../../components/collapse";
import Fuse from "fuse.js";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
const FAQ = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fuzzySearch = (query) => {
    // Configure the fuzzy search options
    const options = {
      keys: ["question", "answer", "tags"],
      threshold: 0.51, // Minimum match percentage threshold
      useLevenshteinAutomaton: true,
    };

    // Create a new instance of the fuzzy search algorithm
    const fuse = new Fuse(searchData, options);

    // Perform the fuzzy search and get the results
    const results = fuse.search(query);
    return results;
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const debounceSearch = debounce((inputValue) => {
    const results = fuzzySearch(inputValue);
    setSearchResults(results);
  }, 1000);
  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    // Debounce the search execution to prevent excessive calls
    debounceSearch(inputValue);
  };
  const handleReset = () => {
    setSearchInput("");
    setSearchResults(fuzzySearch(" "));
  };
  const handleResize = () => {
    const header_height = document.getElementById("faq-header").clientHeight;
    const footer_height = document.getElementById("faq-footer").clientHeight;

    document.getElementsByClassName("faqContainer")[0].style.minHeight =
      window.innerHeight - header_height - footer_height + "px";
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    document.getElementById("land-header").style.display = "none";
    document.getElementById("land-footer").style.display = "none";

    const header_height = document.getElementById("faq-header").clientHeight;
    const footer_height = document.getElementById("faq-footer").clientHeight;

    document.getElementsByClassName("faqContainer")[0].style.minHeight =
      window.innerHeight - header_height - footer_height + "px";
    const results = fuzzySearch(searchInput);
    setSearchResults(results);
    debounceSearch(" ");
  }, []);

  return (
    <div className="fContainer">
      <Header id="faq-header" />
      <div className="faqContainer">
        <div className="search-form">
          <img src="images/search-normal.svg" />
          <input
            type="input"
            placeholder="type a question"
            onChange={handleSearchInput}
            value={searchInput}
          />
          <span className="reset" onClick={() => handleReset()}></span>
        </div>
        <div className="QAList">
          {searchResults.map((value, index) => (
            <Collapsible header={value.item.question} open={false} id={index}>
              {value.item.answer}
            </Collapsible>
          ))}
        </div>
      </div>
      <Footer id="faq-footer" />
    </div>
  );
};

export default FAQ;
