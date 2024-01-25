const prompt = require("prompt-sync")();
let users = {
  user1: "1234",
  user2: "5678",
};

let IS_LOGGED_IN = 0;
let movies = {
  CaptainMiller: 200,
  Ayalan: 200,
};

let tickets_booked = {};

let CURR_USER = "";
let CURR_PASS = "";

while (true) {
  console.log(
    "1.Login\n2.Book Ticket\n3.Logout\n4.My Bookings\n5.Cancel Tickets\n6.Exit"
  );
  let option = prompt("Choose your option?");

  switch (option) {
    case "1":
      if (IS_LOGGED_IN == 1) {
        console.log("Already logged in...\n");
      } else {
        const user = prompt("Enter username: ");
        const pass = prompt("Enter password: ");
        if (user in users && users[user] == pass) {
          IS_LOGGED_IN = 1;
          CURR_USER = user;
          CURR_PASS = pass;
          console.log("Successfully logged in...");
        } else {
          console.log("Invalid Credentials...");
        }
      }
      break;

    case "2":
      if (IS_LOGGED_IN == 1) {
        console.log("\nMovies: ");
        for (const keys of Object.keys(movies)) {
          if (movies[keys] > 0) {
            console.log(keys + " Available Tickets -> " + movies[keys]);
          } else {
            console.log(keys + " Housefull");
          }
        }
        const movieopt = prompt("Select a movie to book: ");
        if (movieopt in movies) {
          let curr = movies[movieopt];
          const numberOfTickets = prompt("Enter number of tickets:  ");
          movies[movieopt] = curr - numberOfTickets;
          console.log("Movie booking successfull");
          if (CURR_USER in tickets_booked) {
            tickets_booked[CURR_USER][0].push(movieopt);
            tickets_booked[CURR_USER][1].push(numberOfTickets);
          } else {
            tickets_booked[CURR_USER] = [[movieopt], [numberOfTickets]];
          }
        } else console.log("Movie not available.. ");
      } else console.log("Please login");
      break;

    case "3":
      console.log(CURR_PASS);
      const pass = prompt("Enter your password: ");
      if (pass == CURR_PASS) {
        console.log("Successfully logged out");
        IS_LOGGED_IN = 0;
        CURR_PASS = "";
        CURR_USER = "";
      } else {
        console.log("Password Incorrect");
      }
      break;
    case "4":
      if (IS_LOGGED_IN == 1) {
        console.log("\nMy Bookings: ");
        for (const [key, value] of Object.entries(tickets_booked)) {
          if (key == CURR_USER) {
            for (let i = 0; i < value[0].length; i++) {
              console.log(
                "Movie: " + value[0][i] + " | Tickets Booked: " + value[1][i]
              );
            }
          }
        }
      } else console.log("Please login!!");
      break;
    case "5":
      if (IS_LOGGED_IN == 1) {
        console.log("\nMy Bookings: ");
        const movieopt = prompt("Enter the movie name to cancel the booking: ");
        if (movieopt in movies) { //check whether the movie exists
          if (CURR_USER in tickets_booked) { //check whether the user booked any tickets
            const index = tickets_booked[CURR_USER][0].indexOf(movieopt); //save the index of the movie in the dict
            if (index != -1) { //check whether the user booked ticket for the movie
              const curr = movies[movieopt]; // find current available tickets for the movie
              movies[movieopt] = curr + tickets_booked[CURR_USER][1][index];
              tickets_booked[CURR_USER][0].splice(index, 1);
              tickets_booked[CURR_USER][1].splice(index, 1);
              console.log("Movie booking cancelled");
            } else {
              console.log("You have not booked any tickets for this movie");
            }
          } else {
            console.log("You have not booked any tickets yet");
          }
        } else {
          console.log("Movie not available.. ");
        }
      } else {
        console.log("Please login");
      }
      break;
    case "6":
      return;
    default:
      console.log("Invalid Option!!");
  }
}
