class CBR {
  _cases = [];
  /**
   * @param {{caseKeyWords: string[], solution: string}[]} cases - Array of cases
   *
   */
  constructor(cases) {
    this._cases = cases;
  }

  /**
   * Calculates the similarity between two arrays of keywords
   * @param {Array} query - Array of keywords
   * @param {Array} caseItemKeywords - Array of keywords
   * @returns {Number} - Similarity between the two arrays
   *
   */
  _calculateSimilarity(query, caseItemKeywords) {
    const commonKeywords = query.filter((keyword) => caseItemKeywords.includes(keyword));
    return commonKeywords.length / Math.max(query.length, caseItemKeywords.length);
  }

  /**
   * CBR Main solve function
   * @params {Array} query - Array of keywords
   * @returns {String} - Solution
   *
   */
  solve(query) {
    let bestMatch = null;
    let bestMatchSimilarity = 0;

    for (const caseItem of this._cases) {
      const similarity = this._calculateSimilarity(query, caseItem.caseKeyWords);
      if (similarity > bestMatchSimilarity) {
        bestMatch = caseItem;
        bestMatchSimilarity = similarity;
      }
    }

    return bestMatch;
  }
}
/*
const caseBase = [
  {
    caseKeyWords: ["engine", "won't start", "crank"],
    solution: "Check the battery and starter motor. Ensure the fuel pump is functioning properly.",
  },
  {
    caseKeyWords: ["overheating", "temperature", "coolant"],
    solution: "Check the coolant level and radiator for any leaks. Verify the functionality of the thermostat.",
  },
  {
    caseKeyWords: ["brakes", "squeaking", "noise"],
    solution: "Inspect and possibly replace the brake pads. Check for any issues with the brake calipers or rotors.",
  },
];

const cbr = new CBR(caseBase);
console.log(cbr.solve(["brakes", "noise", "temperature"]));
*/

module.exports = CBR;