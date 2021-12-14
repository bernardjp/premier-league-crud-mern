import React from 'react';
import PropTypes from 'prop-types';
import useDocTitle from '../Hooks/useDocTitle';
import PageContainer from './BasePage';
import ArticleTitle from '../Components/ArticlesPage/ArticleTitle';
import Article from '../Articles/Article';
import { printParagraphWithLinks, printLinks } from '../Components/ArticlesPage/ArticleParagraph';

ArticlePage.propTypes = {
  articlePageText: PropTypes.shape({
    docTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

function ArticlePage({ articlePageText }) {
  const pageInfo = new Article(articlePageText);
  const paragraphs = pageInfo.text.split(pageInfo.paragraph);
  useDocTitle(pageInfo.docTitle);

  return (
    <PageContainer>
      <ArticleTitle text={pageInfo.title} />
      <section>
        {paragraphs.map((string, i) => printParagraphWithLinks(string, pageInfo, i))}
      </section>
      {pageInfo.links.length > 1 && printLinks(pageInfo.links)}
    </PageContainer>
  );
}

export default ArticlePage;
