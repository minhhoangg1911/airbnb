import { useState, useEffect } from "react";
import Menus from "../../components/Menus/Menus";
import ListRoom from "../../components/ListRoom/ListRoom";
import LoadMore from "../../components/LoadMore/LoadMore";
import Footer from "../../components/Footer/Footer";
import { useListRoom } from "../../hooks/useListRoom";



export default function Home() {
  const listRoom = useListRoom();
  const [visible, setVisible] = useState(8);
  const showLoadMore = () => {
    setVisible((prev) => prev + 4);
    console.log(123);
  };



  return (
    <div className="home">
      <Menus />
      <ListRoom
        listRoom={listRoom}
        visible={visible}
        showLoadMore={showLoadMore}
      />
      <Footer />
    </div>
  );
}
