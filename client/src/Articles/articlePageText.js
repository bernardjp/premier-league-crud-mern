export const aboutPageText = {
  docTitle: 'About this project',
  title: 'About this project',
  text: 'This simple project is an exercise of the introductory course to Node.js provided by "r/Argentina Programa".*p*The data used for this exercise was provided by *a*football-data.org*u*https://www.football-data.org*a* API. The web design and page layout is a design of *a*my own*l*/contact*a*, and takes the color scheme and font design used on the Premier League visual identity design to tie this site to its subject.*p*You can visit *a*r/Argentina Programa*u*https://argentinaprograma.com*a* to access the ongoing course for free.',
  links: []
};

export const contactPageText = {
  docTitle: 'Contact Me',
  title: 'Contact Me',
  text: 'Greets! My name is Juan Pablo Bernard, a former Architect now starting the path to become a Software Developer. You can find more about me on the links down below.',
  links: [
    {
      imgSrc: 'linkedinLogo.png',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/juan-pablo-bernard/'
    },
    {
      imgSrc: 'githubLogo.png',
      name: 'GitHub',
      url: 'https://github.com/bernardjp'
    }
  ]
};

export const resourcePageText = {
  docTitle: null,
  title: 'PREMIER LEAGUE FOOTBALL',
  text: 'The *a*Premier League*u*https://www.premierleague.com*a* is the most-watched sports league in the world, broadcast in 212 territories to 643 million homes and a potential TV audience of 4.7 billion people. The Premier League ranks first in the *a*UEFA coefficients*u*https://www.uefa.com/memberassociations/uefarankings/club/#/yr/2022*a* of leagues based on performances in European competitions over the past five seasons as of 2021. Here you can find more about their teams and players.',
  link: []
};

export const homePageText = {
  docTitle: 'Premier League Database',
  title: 'PREMIER LEAGUE DATABASE',
  text: "Find everything you want to know about your favourite Premier League's team including: full squad lineup, stadium and contact information, official website, and more.",
  subSection: {
    title: 'SEARCH / UPDATE / CREATE',
    text: 'Look between the 20 Members Clubs who make up the League at any one time. Check their info, update it, create new Clubs and delete those relegated to the League One.',
    infoCards: [
      {
        title: 'FIND THE CLUB OR PLAYER',
        text: "The Database contains all the Members Clubs ordered alphabetically. Each entry shows some of the clubs information along side EDIT/DELETE shortcuts. Click on the Club's name and gain access to all our data.",
        image: {
          src: '/assets/hp_search.webp',
          alt: 'club-search-img'
        }
      }, {
        title: 'EDIT IT',
        text: 'All the information about the club, excluding the squad lineup, its exposed to you for editing, just beware of the required entries. The lineup editing and creation tool is soon to be implemented.',
        image: {
          src: '/assets/hp_club.webp',
          alt: 'club-info-img'
        }
      }, {
        title: 'ADD A NEW ONE',
        text: 'Or delete it! Any of the original 20 Members Clubs can be removed and any number of new clubs can be added. Play the fantasy and become the Manager of a brand new Premier Team.',
        image: {
          src: '/assets/hp_update.webp',
          alt: 'club-edit-img'
        }
      }
    ]
  }
};
