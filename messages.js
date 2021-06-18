// Game Messages
const helpMessage = `


HELP
----------------------------------------
WizzenBeard, that forgetful old wizard,
has lost his magic hat. Or perhaps it wandered off?
It does seem to have a mind of its own at times...

Help him find it by telling him which way to go.
Don't let him fall into a dark hole or wander off the edge of the map.
Otherwise I fear the magic of the hat may be lost forever...
----------------------------------------
Controls: (type the key, then press enter)

[l] Move Left
[r] Move Right
[u] Move Up
[d] Move Down
[x] Exit Game
[h] Help

Characters: (as seen on the map)
@' WizzenBeard
^ Wizzenbeard's Missing Hat
O dark hole (full of black magic)

Press [Enter] To Continue`;

const gameTitle = `
Help Old WizzenBeard Find His Magic Hat
----------------------------------------`;

const gamePromptMessage = "Which way? [enter [h] for help]";

const gameOverMessage = `
----------------------------------------
GAME OVER.
----------------------------------------

Play Again? [Y | N]`;

const exitGameMessage = `
Thank you for playing Magic Hat.
----------------------------------------

Goodbye!
`;

// Collision Messages
const edgeCollisionMessage = `
Watch out for that...! nevermind.

You fell off the edge!
`;

const holeCollisionMessage = `
"Wuh, wuh, Whoooooooah!"

You fell in a hole.
`;

const hatCollisionMessage = `
"Yippee! I've finally found my magic hat!"
"Now, where did I leave those magic car keys...?"

Congratulations. You helped Old WizzenBeard find his magic hat.
`;

const collisionMessage = {
  Edge: edgeCollisionMessage,
  Hole: holeCollisionMessage,
  Hat: hatCollisionMessage,
};

gameMessage = {
  Help: helpMessage,
  Title: gameTitle,
  Prompt: gamePromptMessage,
  "Game Over": gameOverMessage,
  Exit: exitGameMessage,
};

module.exports = {
  collisionMessage: collisionMessage,
  gameMessage: gameMessage,
};
