import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { createPages } from "../../utils/pageCreator";
import { pageSize } from "../../configs/config";
import "./main.css";

const BottomButtons = ({
  currentPage,
  totalPageCount,
  dispatchSetCurrentPage,
}) => {
  const pages = [];
  const pageCount = Math.ceil(totalPageCount / pageSize);
  createPages(pages, pageCount, currentPage);
  const elements = pages.map((item, index) => {
    return (
      <span
        key={index}
        className={currentPage === item ? "current-page" : "page"}
        onClick={() => dispatchSetCurrentPage(item)}
      >
        {item + 1}
      </span>
    );
  });

  return (
    <Flex align={"center"} justify={"center"} mt={"6"}>
      <Button
        colorScheme="teal"
        variant="link"
        display={"block"}
        onClick={() => dispatchSetCurrentPage(0)}
      >
        &#8606;
      </Button>
      <div className="pages">{elements}</div>
      <Button
        colorScheme="teal"
        outline={"none"}
        variant="link"
        display={"block"}
        onClick={() => dispatchSetCurrentPage(pageCount - 1)}
      >
        &#8608;
      </Button>
    </Flex>
  );
};

export default BottomButtons;
