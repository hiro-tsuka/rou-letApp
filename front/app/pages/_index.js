import { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import Items from '../components/items';
import Newedit from '../components/newEdit.js'
// import Select from 'react-select'
import Search from '../services/search';
import axios from 'axios';
import qs from 'qs';

const Home = ({ itemsPerPage, Items_ }) => {
  const [items, itemsState] = useState(Items_);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  //都道府県の値を保持
  const [prefecturesVal, setPrefecturesVal] = useState("");
  //市区町村の値を保持
  const [municipalitiesVal, setMunicipalitiesVal] = useState("");
  // console.log(prefecturesVal);



  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // const getToiletInfo = async (value) => {
  //   console.log(value);
  //   const response = await fetch(`http://api:3000/locations?prefectures=${prefecturesVal}&municipalities=${municipalitiesVal}`, { method: "GET" });
  //   const json = await response.json();
  //   itemsState(json);
  // }

  const getToiletInfo = () => {
    console.log(prefecturesVal);
    console.log(municipalitiesVal);
    axios.get(`http://localhost:3000/locations?prefectures=${prefecturesVal}&municipalities=${municipalitiesVal}`)
      .then((res) => {
        itemsState(res.data);
        console.log(res.data);
      })
  }

  // const getToiletInfo = () => {
  //   axios.request({
  //       method: 'get',
  //       params: {
  //         prefectures : prefecturesVal,
  //         municipalities : municipalitiesVal
  //       },
  //       paramsSerializer: (params) => {
  //         return qs.stringify(params, {arrayFormat: 'brackets'});
  //       },
  //     });
  // }




  return (
    <>
      {/* <form onSubmit={preventDefault()}> */}
      <Search
        prefecturesVal={prefecturesVal}
        setPrefecturesVal={setPrefecturesVal}
        setMunicipalitiesVal={setMunicipalitiesVal}
      />
      <button onClick={getToiletInfo}>検索</button>

      {/* </form> */}
      <Items currentItems={currentItems} items={items} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <Newedit/>
    </>
  );
}

export const getServerSideProps = async () => {
  // URLはlocalhostではなくapiとなる
  const response = await fetch("http://api:3000/locations/", { method: "GET" });
  const json = await response.json();
  console.log(response);
  return {
    props: {
      itemsPerPage: 10,
      Items_: json,
    },
  };
}




export default Home;