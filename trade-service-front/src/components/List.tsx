import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {MdArrowRight, MdOutlineClose, MdTimelapse} from "react-icons/md";
import "./form/Form.css"
import {Link} from "react-router-dom";

interface IList {
    items: string[];
    setOrderId: (orderId: string) => void;
}

const List: FC<IList> = ({items, setOrderId}) => {
    const onLinkClicked = (orderId: string) => {
        setOrderId(orderId);
    }

    return (
        <ListGroup style={{marginTop: "3%", marginLeft: "3%"}}>
            {
                items.map((item, index) => (
                    <ListGroup.Item key={ index }>
                        { "Заказ № " + item }
                        <Link to={"/storage/order"} onClick={() => onLinkClicked(item)}>
                            <MdArrowRight
                                title="Перейти"
                                className="list-button"
                            />
                        </Link>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
};

export default List;