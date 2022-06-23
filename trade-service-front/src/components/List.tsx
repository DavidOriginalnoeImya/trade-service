import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {MdOutlineClose} from "react-icons/md";

interface IList {
    items: string[];
    actionComponent: React.ReactNode;
}

const List: FC<IList> = ({items, actionComponent}) => {
    return (
        <ListGroup className="list-group">
            {
                items.map((item, index) => (
                    <ListGroup.Item key={ index }>
                        { item }
                        { actionComponent }
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
};

export default List;