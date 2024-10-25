import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  // Define a type for translation entries
  type TranslationEntry = {
    original: Text;
    translated: Text;
    targetLanguage: Text;
  };

  // Store translation history
  stable var translationHistory : [TranslationEntry] = [];

  // Add a new translation to the history
  public func addTranslation(original: Text, translated: Text, targetLanguage: Text) : async () {
    let newEntry : TranslationEntry = {
      original = original;
      translated = translated;
      targetLanguage = targetLanguage;
    };
    translationHistory := Array.append(translationHistory, [newEntry]);
  };

  // Get the translation history
  public query func getTranslationHistory() : async [TranslationEntry] {
    translationHistory
  };

  // Clear the translation history
  public func clearHistory() : async () {
    translationHistory := [];
  };
}
