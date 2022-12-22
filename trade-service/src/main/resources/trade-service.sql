--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-12-22 23:22:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 18162)
-- Name: availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability (
    shopid integer NOT NULL,
    productid integer NOT NULL,
    productquantity integer NOT NULL
);


ALTER TABLE public.availability OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18216)
-- Name: includes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.includes (
    orderid integer NOT NULL,
    productid integer NOT NULL,
    productquantity integer NOT NULL,
    CONSTRAINT includes_productquantity_check CHECK ((productquantity > 0))
);


ALTER TABLE public.includes OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 18119)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    productid integer NOT NULL,
    name character varying(45) NOT NULL,
    city character varying(45) NOT NULL,
    price double precision NOT NULL,
    minquantity smallint NOT NULL,
    CONSTRAINT product_minquantity_check CHECK ((minquantity > 0)),
    CONSTRAINT product_price_check CHECK ((price > (0)::double precision))
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 18118)
-- Name: product_productid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productid_seq OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_productid_seq OWNED BY public.product.productid;


--
-- TOC entry 216 (class 1259 OID 18206)
-- Name: productorder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productorder (
    orderid integer NOT NULL,
    status character varying(45) NOT NULL,
    shopid integer NOT NULL
);


ALTER TABLE public.productorder OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 18112)
-- Name: shop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop (
    shopid integer NOT NULL,
    address character varying(45) NOT NULL
);


ALTER TABLE public.shop OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 18111)
-- Name: shop_shopid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_shopid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_shopid_seq OWNER TO postgres;

--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 209
-- Name: shop_shopid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_shopid_seq OWNED BY public.shop.shopid;


--
-- TOC entry 214 (class 1259 OID 18128)
-- Name: storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storage (
    slotid integer NOT NULL,
    capacity integer NOT NULL,
    productquantity integer NOT NULL,
    productid integer NOT NULL,
    CONSTRAINT storage_capacity_check CHECK ((capacity > 0))
);


ALTER TABLE public.storage OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 18127)
-- Name: storage_slotid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.storage_slotid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storage_slotid_seq OWNER TO postgres;

--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 213
-- Name: storage_slotid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.storage_slotid_seq OWNED BY public.storage.slotid;


--
-- TOC entry 3187 (class 2604 OID 18122)
-- Name: product productid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN productid SET DEFAULT nextval('public.product_productid_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 18115)
-- Name: shop shopid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop ALTER COLUMN shopid SET DEFAULT nextval('public.shop_shopid_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 18131)
-- Name: storage slotid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage ALTER COLUMN slotid SET DEFAULT nextval('public.storage_slotid_seq'::regclass);


--
-- TOC entry 3356 (class 0 OID 18162)
-- Dependencies: 215
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.availability (shopid, productid, productquantity) FROM stdin;
2	3	10
1	1	9
2	2	27
1	2	27
1	3	19
1	7	3
2	5	0
1	5	7
\.


--
-- TOC entry 3358 (class 0 OID 18216)
-- Dependencies: 217
-- Data for Name: includes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.includes (orderid, productid, productquantity) FROM stdin;
1	2	1
2	2	1
2	3	5
2	7	5
3	2	3
4	2	3
5	2	3
6	2	3
7	2	3
\.


--
-- TOC entry 3353 (class 0 OID 18119)
-- Dependencies: 212
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (productid, name, city, price, minquantity) FROM stdin;
1	Молоко	Тутаев	60.75	50
2	Хлеб	Рыбинск	25.5	40
3	Фарш	Тутаев	180.7	20
4	Кефир	Ярославль	79.99	30
5	Творог	Рыбинск	99.75	50
6	Сметана	Тутаев	85.75	50
7	Молоко	Рыбинск	85	50
8	Творог	Тутаев	120	50
9	Творог	Рыбинск	110	50
\.


--
-- TOC entry 3357 (class 0 OID 18206)
-- Dependencies: 216
-- Data for Name: productorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productorder (orderid, status, shopid) FROM stdin;
2	new	1
1	new	1
3	new	1
4	new	1
5	new	1
6	new	1
7	new	1
\.


--
-- TOC entry 3351 (class 0 OID 18112)
-- Dependencies: 210
-- Data for Name: shop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop (shopid, address) FROM stdin;
1	ул. Советская, строение 5
2	ул. Гагарина, дом 64
\.


--
-- TOC entry 3355 (class 0 OID 18128)
-- Dependencies: 214
-- Data for Name: storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.storage (slotid, capacity, productquantity, productid) FROM stdin;
1	100	65	3
9	100	90	3
6	100	90	7
8	100	15	1
2	200	194	1
4	200	109	2
3	150	90	5
\.


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 211
-- Name: product_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_productid_seq', 9, true);


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 209
-- Name: shop_shopid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_shopid_seq', 2, true);


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 213
-- Name: storage_slotid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.storage_slotid_seq', 9, true);


--
-- TOC entry 3200 (class 2606 OID 18167)
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (shopid, productid);


--
-- TOC entry 3204 (class 2606 OID 18221)
-- Name: includes includes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.includes
    ADD CONSTRAINT includes_pkey PRIMARY KEY (orderid, productid);


--
-- TOC entry 3196 (class 2606 OID 18126)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);


--
-- TOC entry 3202 (class 2606 OID 18210)
-- Name: productorder productorder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productorder
    ADD CONSTRAINT productorder_pkey PRIMARY KEY (orderid);


--
-- TOC entry 3194 (class 2606 OID 18117)
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (shopid);


--
-- TOC entry 3198 (class 2606 OID 18135)
-- Name: storage storage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage
    ADD CONSTRAINT storage_pkey PRIMARY KEY (slotid);


--
-- TOC entry 3205 (class 2606 OID 18136)
-- Name: storage product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage
    ADD CONSTRAINT product FOREIGN KEY (productid) REFERENCES public.product(productid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3206 (class 2606 OID 18168)
-- Name: availability product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT product FOREIGN KEY (productid) REFERENCES public.product(productid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3209 (class 2606 OID 18222)
-- Name: includes product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.includes
    ADD CONSTRAINT product FOREIGN KEY (productid) REFERENCES public.product(productid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3210 (class 2606 OID 18227)
-- Name: includes productorder; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.includes
    ADD CONSTRAINT productorder FOREIGN KEY (orderid) REFERENCES public.productorder(orderid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3207 (class 2606 OID 18173)
-- Name: availability shop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT shop FOREIGN KEY (shopid) REFERENCES public.shop(shopid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3208 (class 2606 OID 18211)
-- Name: productorder shop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productorder
    ADD CONSTRAINT shop FOREIGN KEY (shopid) REFERENCES public.shop(shopid) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-12-22 23:22:24

--
-- PostgreSQL database dump complete
--

