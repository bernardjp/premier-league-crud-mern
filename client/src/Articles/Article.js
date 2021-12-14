class Article {
  constructor({
    title = '', text = '', docTitle = 'Premier League DB', links
  }) {
    this.paragraph = '*p*';
    this.anchor = '*a*';
    this.url = '*u*';
    this.path = '*l*';
    this.title = title;
    this.text = text;
    this.docTitle = docTitle;
    this.links = links;
  }
}

export default Article;
