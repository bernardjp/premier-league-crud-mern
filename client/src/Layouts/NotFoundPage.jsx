import React from 'react';
import PageContainer from './BasePage';
import ArticleTitle from '../Components/ArticlesPage/ArticleTitle';
import BottomNavigation from '../Components/Pagination/BottomNavigation';

function NotFoundPage() {
  return (
    <PageContainer>
      <ArticleTitle text="Page not found" />
      <BottomNavigation />
    </PageContainer>
  );
}

export default NotFoundPage;
