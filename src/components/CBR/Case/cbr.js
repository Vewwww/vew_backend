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

module.exports = CBR;