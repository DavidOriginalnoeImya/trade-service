import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {MdArrowRight, MdOutlineClose, MdTimelapse} from "react-icons/md";
import "./form/Form.css"
import {Link} from "react-router-dom";

interface IList {
    items: string[];
    variant: "waiting" | "transition";
}

const List: FC<IList> = ({items, variant}) => {
    return (
        <ListGroup style={{marginTop: "3%", marginLeft: "3%"}}>
            {
                items.map((item, index) => (
                    <ListGroup.Item key={ index }>
                        { item }

                        {
                            (variant === "waiting") &&
                            <MdTimelapse
                                title="Ожидается обработка на складе"
                                className="list-button"
                            />
                        }

                        {
                            (variant === "transition") &&
                            <Link to={"/storage/order"} >
                                <MdArrowRight
                                    title="Перейти"
                                    className="list-button"
                                />
                            </Link>
                        }

                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
};

export default List;