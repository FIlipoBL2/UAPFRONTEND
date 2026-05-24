// Automatically import all PNG posters in the directory
const posters = import.meta.glob('../assets/posterGame/*.png', { eager: true, import: 'default' });

// Helper to quickly grab a poster by its number
const getPoster = (num) => posters[`../assets/posterGame/${num}.png`] || posters['../assets/posterGame/1.png'];

export const users = [
  { id: 101, username: "Screen Hype", email: "hype@test.com", password: "password123" },
  { id: 102, username: "Softpedia", email: "soft@test.com", password: "password123" },
  { id: 103, username: "TheSixthAxis", email: "sixth@test.com", password: "password123" },
  { id: 104, username: "John Doe", email: "john@test.com", password: "password123" },
  { id: 105, username: "Jane Doe", email: "jane@test.com", password: "password123" },
  { id: 106, username: "Capybara", email: "capy@test.com", password: "password123" },
  { id: 107, username: "Wombat", email: "wombat@test.com", password: "password123" }
];

export const devices = [
  { id: 1, name: "PC" },
  { id: 2, name: "PS4" },
  { id: 3, name: "PS5" },
  { id: 4, name: "XBOX One" },
  { id: 5, name: "XBOX Series X" },
  { id: 6, name: "Nintendo Switch" },
  { id: 7, name: "Mobile" }
];

export const games = [
  { id: 1, title: "Last Of Us", image: getPoster(1), deviceIds: [1] },
  { id: 2, title: "Assasins's Creed: Black Flag", image: getPoster(2), deviceIds: [1, 3, 5] },
  { id: 3, title: "Legend Of Zelda Breath of The Wild", image: getPoster(3), deviceIds: [1, 2] },
  { id: 4, title: "God Of War", image: getPoster(4), deviceIds: [1] },
  { id: 5, title: "Call of Duty Modern Warfare 2", image: getPoster(5), deviceIds: [1, 7] },
  { id: 6, title: "Counter Strike 2", image: getPoster(6), deviceIds: [1, 2, 6] },
  { id: 7, title: "Stardew Valley", image: getPoster(7), deviceIds: [1, 3, 5] },
  { id: 8, title: "Elden Ring 2", image: getPoster(8), deviceIds: [1, 3] },
  { id: 9, title: "Overwatch 3", image: getPoster(9), deviceIds: [1, 5, 6] },
  { id: 10, title: "Half-Life 2", image: getPoster(10), deviceIds: [1] },
  { id: 11, title: "Portal 2", image: getPoster(11), deviceIds: [1, 4] },
  { id: 12, title: "Left 4 Dead 3", image: getPoster(12), deviceIds: [1, 4] },
  { id: 13, title: "Disco Elysium", image: getPoster(13), deviceIds: [1, 3, 6] }
];

export const reviews = [
  { id: 1, gameId: 13, userId: 101, score: 90, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus neque lorem, vulputate sit amet dolor vitae, aliquam ultricies odio. Sed accumsan finibus ipsum eu dapibus. Ut efficitur erat ut tortor tempus, quis rhoncus neque vestibulum. Vivamus aliquet maximus nibh, sit amet maximus nulla varius placerat. In nec eros suscipit, mattis augue nec, lobortis sem. Pellentesque feugiat mattis felis quis pretium. Sed sit amet lorem pharetra, suscipit dui vitae, pellentesque felis. Nulla sed placerat" },
  { id: 2, gameId: 13, userId: 102, score: 80, text: "Nulla luctus vitae enim non cursus. Nullam auctor non dui vitae commodo. Donec et lobortis felis, id cursus sem. Sed est neque, eleifend ac auctor vel, tincidunt in urna. Donec luctus felis in libero consectetur ultricies. Nullam nisi urna, finibus ac suscipit id, malesuada vel nulla. Integer elementum eget urna eu euismod. Nam ligula justo, facilisis quis elementum vitae, sollicitudin ut justo." },
  { id: 3, gameId: 13, userId: 103, score: 90, text: "Maecenas vel neque sed nisl euismod laoreet. Nulla vel dolor ligula. Quisque quis ullamcorper lectus. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse posuere augue velit, sit amet pulvinar sem faucibus vitae. Pellentesque dignissim urna eu sem condimentum, ac ornare ligula placerat. Pellentesque sodales dictum dapibus. In finibus mauris quis augue congue accumsan. Mauris non justo rutrum, viverra mauris id, fringilla justo. Etiam quis ipsum at mi aliquet rhoncus blandit a turpis." },
  { id: 4, gameId: 1, userId: 104, score: 55, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae tortor scelerisque, cursus magna quis, ullamcorper erat. Donec maximus dictum metus eget semper. Vivamus sed odio hendrerit, laoreet elit sed, malesuada libero. Morbi rhoncus massa vitae massa ultrices, quis pretium purus hendrerit. Nam ut luctus nulla. Suspendisse at elit felis. Praesent id felis dolor." },
  { id: 5, gameId: 2, userId: 105, score: 70, text: "Mauris eu pulvinar dolor. Nunc a leo sed urna finibus posuere. Aenean scelerisque accumsan orci, in ullamcorper ex pulvinar non. Fusce iaculis dolor vel neque tincidunt vulputate. Nulla facilisi. Curabitur quis arcu vitae erat commodo iaculis ut vel tortor. Ut ut quam ante." },
  { id: 6, gameId: 3, userId: 106, score: 95, text: "Suspendisse eleifend enim at nisl tristique auctor. Ut vel nunc in velit pulvinar interdum eu vel nulla. Vivamus quis metus sit amet orci tincidunt finibus. Nullam a nibh nec velit faucibus malesuada vel eget sem. Praesent eu libero tristique, euismod justo ut, elementum urna. Donec nec tristique orci." },
  { id: 7, gameId: 5, userId: 107, score: 45, text: "Sed vitae libero eget arcu pellentesque faucibus. Vivamus nec massa eu ex lobortis ultricies. Duis eu tincidunt justo. Nam quis hendrerit leo, sit amet pretium lectus. Cras tincidunt quam at ex ultrices tristique. Nullam sit amet justo in mi ultrices elementum ut ut libero." },
  { id: 8, gameId: 1, userId: 106, score: 85, text: "Non ante varius, maximus est vel, scelerisque ex. Aliquam erat volutpat. In sed metus nec quam tincidunt aliquam. Morbi at elit eget tortor efficitur tincidunt. Sed non lorem nisi." },
  { id: 9, gameId: 2, userId: 101, score: 60, text: "Vestibulum feugiat, justo sit amet posuere sagittis, libero nulla suscipit nisi, ut scelerisque sapien quam sit amet nulla. Integer porta ipsum sed dui vestibulum rhoncus. Curabitur vitae laoreet nulla. Donec tincidunt malesuada arcu sed imperdiet. Suspendisse potenti. Pellentesque convallis nulla quis tempor mattis. Quisque mauris purus, venenatis a ornare ut, rhoncus et quam. Donec non diam nec ante mattis lacinia. Duis placerat ipsum diam, eget aliquam massa euismod eu. Ut at tellus feugiat, iaculis mi in, pulvinar nunc. Ut eu erat nunc. Sed quis molestie mauris. Integer vel ante nec nulla lacinia ultrices vitae ac felis. Curabitur in gravida nisl. Morbi nec imperdiet augue. Nam tortor nisl, molestie nec fringilla quis, vestibulum eget enim." },
  { id: 10, gameId: 3, userId: 104, score: 88, text: "Aliquam erat volutpat. Donec accumsan leo a finibus dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras id leo vel nunc mattis tristique. Nunc congue ipsum in leo dignissim, eget bibendum magna tristique. Duis eu nisi nec nisi bibendum dictum quis sed sem. Cras tincidunt, dui vel ultrices euismod, leo nulla hendrerit metus, quis dignissim justo turpis ac neque. Praesent dictum, erat vitae dictum scelerisque, nisi ipsum euismod odio, vel feugiat velit quam nec nibh. Sed finibus dui vel justo scelerisque sagittis. Proin id dictum neque. Vestibulum eu ultricies velit. Vestibulum lacinia turpis eget sapien faucibus, sit amet commodo dolor placerat." },
  { id: 11, gameId: 4, userId: 105, score: 92, text: "Quisque a tristique risus. Curabitur tincidunt id nulla in scelerisque. Suspendisse vel sapien id magna iaculis auctor non at turpis. Cras eu justo quis dui facilisis tempor. Donec tincidunt, tortor sit amet commodo finibus, metus metus scelerisque sem, sed rhoncus eros nulla vel sem. Aliquam eu ante id justo dapibus rhoncus. Nam tristique diam ut leo sagittis interdum. Curabitur a orci est. Etiam eu leo eu magna congue vehicula sit amet eu nunc. Sed malesuada tincidunt erat, nec tristique orci malesuada sit amet. Nullam suscipit sem a tortor tristique, in venenatis magna efficitur. Nulla facilisi. Maecenas sed nisl est. Donec facilisis, nunc at malesuada aliquet, leo justo vulputate eros, vel tincidunt odio nunc vitae felis. In hac habitasse platea dictumst." },
  { id: 12, gameId: 4, userId: 107, score: 40, text: "Donec eu odio eu leo euismod hendrerit. Duis pulvinar metus a ante elementum, eu commodo nulla scelerisque. Proin eu quam eget libero lacinia lobortis non eget turpis. In hac habitasse platea dictumst. Ut a justo tortor. Cras congue nisl a lectus tincidunt, nec tristique est iaculis. In eu finibus magna. Sed nec leo eu lectus suscipit auctor a ac metus. Sed tristique dictum lorem, at tincidunt elit dictum vel. Sed vel est id felis convallis posuere vel sit amet dolor. Nam ac dolor id metus iaculis feugiat a eu velit. Vestibulum vel metus sed mi dictum sagittis. Sed vel massa eget ligula facilisis malesuada. Ut eu velit sem. Cras vel tristique orci." }
];

export const newReleases = games.slice(-10).reverse();

export const latestReviews = reviews.slice(-10).reverse().map(review => {
  const game = games.find(g => g.id === review.gameId);
  const user = users.find(u => u.id === review.userId);
  return {
    ...review,
    gameTitle: game ? game.title : "Unknown Game",
    reviewer: user ? user.username : "Unknown User"
  };
});
