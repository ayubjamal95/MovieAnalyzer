export default class MoviesAnalyzer {
  constructor(movies, users) {
    this.movies = movies;
    this.users = users;
  }

  topRatedMoviesAmongFriends(userId) {
    // TODO: Implement
    const ratings = new Map();

    const Friends = () => {
      let returnFriends;
      this.users.map(x => {
        if (x.userId === userId) {
          returnFriends = x.friends;
        }
      })
      return returnFriends;
    }

    const ratingsMap = () => {
      let FriendsList = Friends();
      FriendsList.map(Friend => {
        this.movies.map(x => {

          x.ratings.map(y => {
            if (y.userId == Friend) {
              ratings.set(x.title, y.rating);
            }
          })
        })

      })
      return ratings;
    }

    let moviesMap = ratingsMap();
    const sortedMovies = new Map([...moviesMap].sort((a, b) => b[1] - a[1]));
    const filteredMovies = new Map(
      Array.from(sortedMovies).filter(([key, value], idx) => {
        if (idx < 3) {
          return true;
        }

        return false;
      }),
    );

    console.log(filteredMovies);
    const sortedAlphabeticallyMovies = new Map(Array.from(filteredMovies.entries()).sort(
      ([aName, aNumber], [bName, bNumber]) => {
        if (aNumber === bNumber) {
          if (aName < bName) return -1;
          return 1;
        } else if (aNumber > bNumber) return -1;
        return 1;
      }
    ));
    console.log(sortedAlphabeticallyMovies);
    let finallist = Array.from(sortedAlphabeticallyMovies.keys());
    return finallist;
  }
}
