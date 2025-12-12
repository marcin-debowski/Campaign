import { useState, useEffect } from "react";

interface UseKeywordsTypeaheadProps {
  keywords: string[];
  suggestedKeywords: string[];
}

interface UseKeywordsTypeaheadReturn {
  keywordsInput: string;
  setKeywordsInput: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  suggestions: string[];
  handleKeywordsChange: (value: string) => void;
  addSuggestion: (suggestion: string) => void;
  getKeywordsArray: () => string[];
}

export const useKeywordsTypeahead = ({
  keywords,
  suggestedKeywords,
}: UseKeywordsTypeaheadProps): UseKeywordsTypeaheadReturn => {
  const [keywordsInput, setKeywordsInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (keywords.length > 0) {
      setKeywordsInput(keywords.join(", "));
    }
  }, [keywords]);

  const getLastKeyword = (): string => {
    const keywordsList = keywordsInput.split(",");
    return keywordsList[keywordsList.length - 1].trim();
  };

  const getCurrentKeywords = (): string[] => {
    return keywordsInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");
  };

  const suggestions = suggestedKeywords.filter((word) => {
    const lastWord = getLastKeyword();
    const currentKeywords = getCurrentKeywords();
    const alreadyAdded = currentKeywords.some((kw) => kw.toLowerCase() === word.toLowerCase());

    return (
      !alreadyAdded && lastWord.length > 0 && word.toLowerCase().includes(lastWord.toLowerCase())
    );
  });

  const handleKeywordsChange = (value: string) => {
    setKeywordsInput(value);
    setShowSuggestions(value.length > 0);
  };

  const addSuggestion = (suggestion: string) => {
    const parts = keywordsInput.split(",").map((k) => k.trim());
    parts[parts.length - 1] = suggestion;
    const newValue = parts.join(", ");
    setKeywordsInput(newValue + ", ");
    setShowSuggestions(false);
  };

  const getKeywordsArray = (): string[] => {
    return keywordsInput
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword !== "");
  };

  return {
    keywordsInput,
    setKeywordsInput,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    handleKeywordsChange,
    addSuggestion,
    getKeywordsArray,
  };
};
