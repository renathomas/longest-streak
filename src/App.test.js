import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders start typing placeholder", () => {
    render(<App />);
    const placeholderElement = screen.getByText(/Start typing.../i);
    expect(placeholderElement).toBeInTheDocument();
  });

  test("displays longest even or odd streak", () => {
    render(<App />);
    const streakInfoElement = screen.getByText(/Longest even or odd streak:/i);
    expect(streakInfoElement).toBeInTheDocument();
  });

  test("updates text on keypress", () => {
    render(<App />);
    const inputText = "abc";
    inputText.split("").forEach((char) => {
      fireEvent.keyDown(document, { key: char });
    });
    expect(screen.getByText(inputText)).toBeInTheDocument();
  });

  test("removes text on backspace", () => {
    render(<App />);
    const inputText = "abc";
    inputText.split("").forEach((char) => {
      fireEvent.keyDown(document, { key: char });
    });
    fireEvent.keyDown(document, { key: "Backspace" });
    expect(screen.getByText("ab")).toBeInTheDocument();
  });

  test("fetches and displays the correct streak", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ streak: "ab", streak_length: 2 }),
      })
    );

    render(<App />);
    const inputText = "ab";
    inputText.split("").forEach((char) => {
      fireEvent.keyDown(document, { key: char });
    });

    const streakLengthElement = await screen.findByText(
      /Longest even or odd streak: 2/
    );
    expect(streakLengthElement).toBeInTheDocument();
  });

  test("highlights the streak in the displayed text", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ streak: "aa", streak_length: 2 }),
      })
    );

    render(<App />);
    const inputText = "aabc";
    inputText.split("").forEach((char) => {
      fireEvent.keyDown(document, { key: char });
    });

    // Wait for the fetch to complete and update the state
    const highlightedSpan = await screen.findByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "span" &&
        element.style.backgroundColor === "yellow" &&
        content.includes("aa")
      );
    });

    // Check that the highlighted text is "a"
    expect(highlightedSpan).toBeInTheDocument();
    expect(highlightedSpan).toHaveTextContent("aa");

    // Check that "b" is not highlighted
    const nonHighlightedSpan = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "span" &&
        element.style.backgroundColor !== "yellow" &&
        content.includes("bc")
      );
    });

    expect(nonHighlightedSpan).toBeInTheDocument();
    expect(nonHighlightedSpan).toHaveTextContent("bc");
  });
});
