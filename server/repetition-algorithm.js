exports.addCard = function () {
  var result = {bucket: 'red'};
  return result;
};



/*--- dashboard Display
React:
 GET /dashboard    (with session ID)

Server:
  /dashboard routes to: 
  request-handler: getDeckScores
    calls mongo model: getUserScores:
       query Familiarities for scores on all cards for the given user:
        -> cardScores = {cardId: score, ...}, for the given user 

    calls google: getAllCards:
      query Google for all (card id, deck name)
      result structure = {deckname: {red: score, orange: score, green: score}, ...}

    for each line of the Google table returned
      call bucketing method of algorithm to increment 
        the appropriate red/orange/green value for result[deckname]
        based on cardScores[cardId]
      if the cardId is not found in Familiarities:
        get score from algorithm (red)
        call mongo: addFamiliarity(userId, cardId, score)

  return: result to React


--- Request for a specific deck quiz
React:
 GET /quiz/:deckname
 
Server:
  request-handler getDeckQuiz:
    calls algorithm for green score threshold
    calls mongo model: getOrderedCardIds 
      query Familiarities from highest to lowest score for user where score > green threshold
        into array of cardIds 
    
    calls google model: getDeckCards(deckname, orderedIdList)
      get [first name, last name, pic link] corresponding to
        these cardIds in order
      filter out cards that are not in the right deck

      returns: [[first name, last name, picture link], ...] 
       in order of decreasing importance (=priority) for quiz
 
  returns result from google model


--- After each card of quiz
React:
 POST /api/card with data: card Id + result (red/orange/green)

Server: 
 returns OK
 recomputes the algo value for user + card:

Algorithm:
 previous score = find(cardId, userId)
 new score = compute (previous score, current card quiz score)
 replace (cardId, userId, new score)



--- Add records to Familiarities
To reset the system:

When a staff member registers:
  Get all card records from Google
  For each card record
    call getStartScore from algorithm (redest?)
    Call addFamiliarity(userId, cardId, score)



*/