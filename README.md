# This is the group project for Team E, CPSC 5021 Database Systems, Spring Quarter 2024

**An appointment scheduler intended for a medical setting.**

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---
![screenshot of dashboard](/public/sample-dashboard.png)
---
![screenshot of appointments](/public/sample-appointments.png)
---
![screenshot of vacations](/public/sample-vacations.png)
---
![screenshot of patients](/public/sample-patients.png)
---
![screenshot of physicians](/public/sample-physicians.png)

## Prerequisites
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [GitHub](https://github.com/) account

## Setting Up
- Once you've cloned this repository into a local repository, open a terminal at your local repo and run `npm i` to install all dependencies.
- Use MySQLWorkbench to open and run `/load-data/data-dump.sql` to setup the necessary MySQL database on your machine.
- Create a file named `.env` in the project root folder and fill in the details specific to your local database 
    - see `.env.example` for the required values
- To see the project's UI
    - `npm run dev` in the terminal 
    - open [http://localhost:3000](http://localhost:3000) with your browser to see the result
- All of the database-application CRUD functionality is in `/app/server.js`

## Starting Work
Before you get started working on anything, run `git checkout -b [your-name]/first`. You should see a message in the terminal similar to this: 

![example of git branch](/public/git-branch-example.png)

Now you're ready to start working!

## Learn More

- [Git](https://gist.github.com/brandon1024/14b5f9fcfd982658d01811ee3045ff1e) - learn about version control
    - [Git and GitHub for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk) (~1 hr video)
    - [Git for Professionals](https://www.youtube.com/watch?v=Uszj_k0DGsg) (~40 min video)
    - [Git and GitHub for Collaboration](https://www.youtube.com/watch?v=MnUd31TvBoU) (~15 min video)
    - [practice using Git](https://www.freecodecamp.org/learn/relational-database/learn-git-by-building-an-sql-reference-object/build-an-sql-reference-object) in the context of a similar application that features an app-database interface

- [JavaScript](https://github.com/mbeaudru/modern-js-cheatsheet) - learn about JS (should be easier getting started than it was with Java, C++)
    - [JS Cheat Sheet](https://htmlcheatsheet.com/js/)
    - [Leetcode](https://leetcode.com/) - use Leetcode to practice solving small (or large) problems using JS

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
    - [Learn React](https://nextjs.org/learn/react-foundations) - an interactive React tutorial.
    - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
