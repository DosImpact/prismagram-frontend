import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../components/FatText";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading }) => (
  <Wrapper>
    <div> [DEV : SERACH PERSENTER]</div>
    {searchTerm === undefined && <FatText text={`Search for ${searchTerm}`} />}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
