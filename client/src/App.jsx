import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Homepage from './Layouts/Homepage';
import ArticlePage from './Layouts/ArticlePage';
import ResourceListPage from './Layouts/ResourceListPage';
import DetailPage from './Layouts/DetailPage';
import { FormPage } from './Layouts/FormPage';
import NotFoundPage from './Layouts/NotFoundPage';
import theme from './styles/theme';
import { aboutPageText, contactPageText } from './Articles/articlePageText';

const PageWrapper = styled.div`
  background-image: url(${theme.background.image});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;

  align-items: center;
  background-color: ${props => props.theme.background.color};
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.fonts_family.primary};
  height: 100%;
  justify-content: space-between;
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
  position: relative;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/reload" exact component={null} />
            <Route path="/resources" exact component={ResourceListPage} />
            <Route path="/resources/clubs" exact component={ResourceListPage} />
            <Route path="/resources/clubs/new" exact component={FormPage} />
            <Route path="/resources/clubs/update/:id" component={FormPage} />
            <Route path="/resources/clubs/:id" component={() => <DetailPage type="clubs" />} />
            <Route path="/resources/players" exact component={ResourceListPage} />
            <Route path="/resources/players/new" exact component={FormPage} />
            <Route path="/resources/players/update/:id" component={FormPage} />
            <Route path="/resources/players/:id" component={() => <DetailPage type="players" />} />
            <Route path="/resources/competitions/:id" component={() => <DetailPage type="competitions" />} />
            <Route path="/about" exact component={() => <ArticlePage articlePageText={aboutPageText} />} />
            <Route path="/contact" exact component={() => <ArticlePage articlePageText={contactPageText} />} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Router>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
