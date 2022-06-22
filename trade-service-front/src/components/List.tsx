import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {MdOutlineClose} from "react-icons/md";

interface IList {
    items: string[];
    itemAction: () => void;
}

const List: FC<IList> = ({items, itemAction}) => {
    return (
        <ListGroup className="list-group">
            {
                items.map((item, index) => (
                    <ListGroup.Item key={ index }>
                        { item }
                        <MdOutlineClose
                            className="product-del-button"
                            title="Удалить"
                            onClick={() => itemAction()}
                        />
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
};

export default List;