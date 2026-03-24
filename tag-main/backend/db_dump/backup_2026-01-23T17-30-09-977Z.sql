--
-- PostgreSQL database dump
--

\restrict wUdgcO6Bmlv0d7SGh9s6j6eM5d0RwnjiJnk9bMGpEbytE9ZD7fG1SfpnRReNHxi

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg12+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg12+2)

-- Started on 2026-01-23 23:00:10 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1001 (class 1247 OID 21036)
-- Name: difficulty_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.difficulty_enum AS ENUM (
    'easy',
    'intermediate',
    'advanced'
);


ALTER TYPE public.difficulty_enum OWNER TO postgres;

--
-- TOC entry 1025 (class 1247 OID 21314)
-- Name: enum_AquaticPlants_difficulty; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_AquaticPlants_difficulty" AS ENUM (
    'easy',
    'intermediate',
    'advanced'
);


ALTER TYPE public."enum_AquaticPlants_difficulty" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 1028 (class 1247 OID 21322)
-- Name: enum_AquaticPlants_growth_rate; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_AquaticPlants_growth_rate" AS ENUM (
    'slow',
    'medium',
    'fast',
    'very fast'
);


ALTER TYPE public."enum_AquaticPlants_growth_rate" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 1031 (class 1247 OID 21332)
-- Name: enum_AquaticPlants_lighting; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_AquaticPlants_lighting" AS ENUM (
    'low',
    'medium',
    'high',
    'very high'
);


ALTER TYPE public."enum_AquaticPlants_lighting" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 1022 (class 1247 OID 21302)
-- Name: enum_AquaticPlants_placement; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_AquaticPlants_placement" AS ENUM (
    'foreground',
    'midground',
    'background',
    'floating',
    'surface'
);


ALTER TYPE public."enum_AquaticPlants_placement" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 944 (class 1247 OID 19802)
-- Name: enum_CommunityForums_rejection_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityForums_rejection_status" AS ENUM (
    'pending',
    'approved',
    'denied'
);


ALTER TYPE public."enum_CommunityForums_rejection_status" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 941 (class 1247 OID 19795)
-- Name: enum_CommunityForums_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityForums_status" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_CommunityForums_status" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 989 (class 1247 OID 20022)
-- Name: enum_SpeciesDictionary_breeding_difficulty; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_breeding_difficulty" AS ENUM (
    'very_easy',
    'easy',
    'moderate',
    'difficult',
    'very_difficult'
);


ALTER TYPE public."enum_SpeciesDictionary_breeding_difficulty" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 983 (class 1247 OID 20000)
-- Name: enum_SpeciesDictionary_care_level; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_care_level" AS ENUM (
    'very_easy',
    'easy',
    'moderate',
    'difficult',
    'expert'
);


ALTER TYPE public."enum_SpeciesDictionary_care_level" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 980 (class 1247 OID 19992)
-- Name: enum_SpeciesDictionary_diet_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_diet_type" AS ENUM (
    'herbivore',
    'carnivore',
    'omnivore'
);


ALTER TYPE public."enum_SpeciesDictionary_diet_type" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 992 (class 1247 OID 20034)
-- Name: enum_SpeciesDictionary_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_status" AS ENUM (
    'draft',
    'published',
    'archived'
);


ALTER TYPE public."enum_SpeciesDictionary_status" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 986 (class 1247 OID 20012)
-- Name: enum_SpeciesDictionary_temperament; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_temperament" AS ENUM (
    'peaceful',
    'semi_aggressive',
    'aggressive',
    'territorial'
);


ALTER TYPE public."enum_SpeciesDictionary_temperament" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 977 (class 1247 OID 19985)
-- Name: enum_SpeciesDictionary_water_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_water_type" AS ENUM (
    'freshwater',
    'brackish',
    'marine'
);


ALTER TYPE public."enum_SpeciesDictionary_water_type" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 929 (class 1247 OID 19745)
-- Name: enum_Users_gender; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_gender" AS ENUM (
    'male',
    'female',
    'rather_not_say'
);


ALTER TYPE public."enum_Users_gender" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 932 (class 1247 OID 19752)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'user',
    'admin',
    'support'
);


ALTER TYPE public."enum_Users_role" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 935 (class 1247 OID 19760)
-- Name: enum_Users_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_status" AS ENUM (
    'active',
    'inactive',
    'locked'
);


ALTER TYPE public."enum_Users_status" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 956 (class 1247 OID 19880)
-- Name: enum_VideoGuides_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_VideoGuides_status" AS ENUM (
    'approved',
    'pending',
    'rejected'
);


ALTER TYPE public."enum_VideoGuides_status" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 965 (class 1247 OID 19916)
-- Name: enum_textguides_rejection_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public.enum_textguides_rejection_status AS ENUM (
    'pending',
    'approved',
    'denied'
);


ALTER TYPE public.enum_textguides_rejection_status OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 962 (class 1247 OID 19909)
-- Name: enum_textguides_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public.enum_textguides_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_textguides_status OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 1004 (class 1247 OID 21044)
-- Name: growth_rate_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.growth_rate_enum AS ENUM (
    'slow',
    'medium',
    'fast',
    'very fast'
);


ALTER TYPE public.growth_rate_enum OWNER TO postgres;

--
-- TOC entry 1007 (class 1247 OID 21054)
-- Name: light_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.light_enum AS ENUM (
    'low',
    'medium',
    'high',
    'very high'
);


ALTER TYPE public.light_enum OWNER TO postgres;

--
-- TOC entry 998 (class 1247 OID 21024)
-- Name: placement_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.placement_enum AS ENUM (
    'foreground',
    'midground',
    'background',
    'floating',
    'surface'
);


ALTER TYPE public.placement_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 289 (class 1259 OID 21064)
-- Name: AquaticPlants; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."AquaticPlants" (
    id integer CONSTRAINT aquaticplants_id_not_null NOT NULL,
    scientific_name character varying(255) CONSTRAINT aquaticplants_scientific_name_not_null NOT NULL,
    common_name character varying(255),
    family character varying(100),
    origin character varying(100),
    placement character varying(32) DEFAULT 'midground'::public.placement_enum,
    difficulty character varying(32) DEFAULT 'easy'::public.difficulty_enum,
    growth_rate character varying(32) DEFAULT 'medium'::public.growth_rate_enum,
    temp_min_celsius numeric(4,1),
    temp_max_celsius numeric(4,1),
    ph_min numeric(3,1),
    ph_max numeric(3,1),
    gh_min integer,
    gh_max integer,
    lighting character varying(32) DEFAULT 'medium'::public.light_enum,
    co2_required boolean DEFAULT false,
    propogation_method text,
    max_height_cm integer,
    is_true_aquatic boolean DEFAULT true,
    description text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."AquaticPlants" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 281 (class 1259 OID 19839)
-- Name: Comments; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."Comments" (
    id uuid NOT NULL,
    content character varying(255) NOT NULL,
    user_id uuid NOT NULL,
    forum_id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Comments" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 282 (class 1259 OID 19860)
-- Name: CommunityChats; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."CommunityChats" (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    room_id uuid NOT NULL,
    message text NOT NULL,
    edited_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."CommunityChats" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 280 (class 1259 OID 19809)
-- Name: CommunityForums; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."CommunityForums" (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    creator_id uuid NOT NULL,
    likes character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    dislike character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    is_private boolean DEFAULT false NOT NULL,
    status public."enum_CommunityForums_status" DEFAULT 'pending'::public."enum_CommunityForums_status" NOT NULL,
    rejection_justification text,
    rejection_requested_by uuid,
    rejection_status public."enum_CommunityForums_rejection_status" DEFAULT 'pending'::public."enum_CommunityForums_rejection_status",
    image_url character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CommunityForums" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 295 (class 1259 OID 21731)
-- Name: FAQs; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."FAQs" (
    id uuid NOT NULL,
    question character varying(255) NOT NULL,
    answers character varying(255) NOT NULL,
    created_by uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FAQs" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 296 (class 1259 OID 21751)
-- Name: GuestConversions; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."GuestConversions" (
    id uuid NOT NULL,
    guest_id uuid NOT NULL,
    user_id uuid NOT NULL,
    converted_at timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GuestConversions" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 286 (class 1259 OID 19968)
-- Name: Guests; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."Guests" (
    id uuid NOT NULL,
    guest_name character varying(255) NOT NULL,
    ip_address character varying(255) NOT NULL,
    country_code character varying(2),
    region character varying(255),
    latitude numeric(9,6),
    longitude numeric(9,6),
    last_seen timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Guests" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 291 (class 1259 OID 21085)
-- Name: PlantImages; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantImages" (
    id integer CONSTRAINT plantimages_id_not_null NOT NULL,
    plant_id integer,
    image_url text CONSTRAINT plantimages_image_url_not_null NOT NULL,
    is_primary boolean DEFAULT false,
    caption character varying(255)
);


ALTER TABLE public."PlantImages" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 294 (class 1259 OID 21112)
-- Name: PlantTag_Map; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantTag_Map" (
    plant_id integer CONSTRAINT planttag_map_plant_id_not_null NOT NULL,
    tag_id integer CONSTRAINT planttag_map_tag_id_not_null NOT NULL
);


ALTER TABLE public."PlantTag_Map" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 293 (class 1259 OID 21102)
-- Name: PlantTags; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantTags" (
    id integer CONSTRAINT planttags_id_not_null NOT NULL,
    tag_name character varying(50) CONSTRAINT planttags_tag_name_not_null NOT NULL
);


ALTER TABLE public."PlantTags" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 287 (class 1259 OID 20041)
-- Name: SpeciesDictionary; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."SpeciesDictionary" (
    fish_id uuid NOT NULL,
    common_name character varying(255) NOT NULL,
    scientific_name character varying(255) NOT NULL,
    family character varying(100),
    origin character varying(255),
    description text NOT NULL,
    min_temp numeric(4,1),
    max_temp numeric(4,1),
    min_ph numeric(3,1),
    max_ph numeric(3,1),
    min_hardness integer,
    max_hardness integer,
    water_type public."enum_SpeciesDictionary_water_type" NOT NULL,
    diet_type public."enum_SpeciesDictionary_diet_type",
    diet_info text,
    max_size_cm numeric(5,2),
    min_tank_size_liters integer,
    care_level public."enum_SpeciesDictionary_care_level" DEFAULT 'moderate'::public."enum_SpeciesDictionary_care_level",
    temperament public."enum_SpeciesDictionary_temperament" DEFAULT 'peaceful'::public."enum_SpeciesDictionary_temperament",
    compatibility_notes text,
    primary_image character varying(500),
    gallery_images json,
    breeding_difficulty public."enum_SpeciesDictionary_breeding_difficulty",
    breeding_notes text,
    views_count integer DEFAULT 0,
    created_by uuid,
    status public."enum_SpeciesDictionary_status" DEFAULT 'published'::public."enum_SpeciesDictionary_status",
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."SpeciesDictionary" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 279 (class 1259 OID 19767)
-- Name: Users; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."Users" (
    id uuid NOT NULL,
    userid character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    dob date NOT NULL,
    gender public."enum_Users_gender" NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."enum_Users_role" DEFAULT 'user'::public."enum_Users_role",
    status public."enum_Users_status" DEFAULT 'active'::public."enum_Users_status" NOT NULL,
    failed_login_attempts integer DEFAULT 0 NOT NULL,
    last_seen timestamp with time zone,
    community_rating integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    ip_address character varying(255),
    country_code character varying(2),
    region character varying(255),
    latitude numeric(9,6),
    longitude numeric(9,6)
);


ALTER TABLE public."Users" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 283 (class 1259 OID 19887)
-- Name: VideoGuides; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."VideoGuides" (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    "youtubeLink" character varying(255) NOT NULL,
    "channelAvatarUrl" character varying(255),
    description text,
    "videoId" character varying(255) NOT NULL,
    duration character varying(255),
    "viewCount" integer DEFAULT 0,
    category character varying(255),
    "isActive" boolean DEFAULT true,
    status public."enum_VideoGuides_status" DEFAULT 'approved'::public."enum_VideoGuides_status",
    "submittedBy" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."VideoGuides" OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 288 (class 1259 OID 21063)
-- Name: aquaticplants_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public.aquaticplants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aquaticplants_id_seq OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 288
-- Name: aquaticplants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public.aquaticplants_id_seq OWNED BY public."AquaticPlants".id;


--
-- TOC entry 290 (class 1259 OID 21084)
-- Name: plantimages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public.plantimages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plantimages_id_seq OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 290
-- Name: plantimages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public.plantimages_id_seq OWNED BY public."PlantImages".id;


--
-- TOC entry 292 (class 1259 OID 21101)
-- Name: planttags_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public.planttags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planttags_id_seq OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 292
-- Name: planttags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public.planttags_id_seq OWNED BY public."PlantTags".id;


--
-- TOC entry 285 (class 1259 OID 19949)
-- Name: text_authors; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.text_authors (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id uuid NOT NULL,
    text_id uuid NOT NULL
);


ALTER TABLE public.text_authors OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 284 (class 1259 OID 19923)
-- Name: textguides; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.textguides (
    id uuid NOT NULL,
    title character varying(50) NOT NULL,
    content character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    status public.enum_textguides_status DEFAULT 'pending'::public.enum_textguides_status NOT NULL,
    author uuid NOT NULL,
    rejection_justification text,
    rejection_requested_by uuid,
    rejection_status public.enum_textguides_rejection_status DEFAULT 'pending'::public.enum_textguides_rejection_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.textguides OWNER TO admin_aquaguide_db_user;

--
-- TOC entry 3428 (class 2604 OID 21067)
-- Name: AquaticPlants id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants" ALTER COLUMN id SET DEFAULT nextval('public.aquaticplants_id_seq'::regclass);


--
-- TOC entry 3435 (class 2604 OID 21088)
-- Name: PlantImages id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages" ALTER COLUMN id SET DEFAULT nextval('public.plantimages_id_seq'::regclass);


--
-- TOC entry 3437 (class 2604 OID 21105)
-- Name: PlantTags id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags" ALTER COLUMN id SET DEFAULT nextval('public.planttags_id_seq'::regclass);


--
-- TOC entry 3693 (class 0 OID 21064)
-- Dependencies: 289
-- Data for Name: AquaticPlants; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."AquaticPlants" (id, scientific_name, common_name, family, origin, placement, difficulty, growth_rate, temp_min_celsius, temp_max_celsius, ph_min, ph_max, gh_min, gh_max, lighting, co2_required, propogation_method, max_height_cm, is_true_aquatic, description, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3685 (class 0 OID 19839)
-- Dependencies: 281
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Comments" (id, content, user_id, forum_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3686 (class 0 OID 19860)
-- Dependencies: 282
-- Data for Name: CommunityChats; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."CommunityChats" (id, user_id, room_id, message, edited_at, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3684 (class 0 OID 19809)
-- Dependencies: 280
-- Data for Name: CommunityForums; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."CommunityForums" (id, title, content, creator_id, likes, dislike, is_private, status, rejection_justification, rejection_requested_by, rejection_status, image_url, "createdAt", "updatedAt") FROM stdin;
8746e5a9-b8dd-47b9-b2ac-bc0c239418f4	Beginner Fish Keeping (Pt. 2): 5 Common Mistakes to Avoid | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong>\n        Part 1 | <span style="color: #dc3545;"><strong>Part 2</strong></span> | Part 3 | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #dc3545; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #dc3545; font-size: 28px;">Beginner Fish Keeping (Pt. 2): 5 Common Mistakes to Avoid</h1>\n        <p style="font-style: italic; color: #666;">Essential Survival Guide by <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>Avoid "New Tank Syndrome" by dodging these five pitfalls to ensure a healthy, long-lived aquarium.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #dc3545; padding-left: 10px;">1. Overfeeding (The #1 Fish Killer)</h2>\n        <p>Uneaten food falls to the bottom, rots, and creates a massive <strong>Ammonia spike</strong>.</p>\n        <blockquote style="background: #fff5f5; border-left: 10px solid #dc3545; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Only feed what your fish can eat in 2 minutes.\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #dc3545; padding-left: 10px;">2. Cleaning Filters with Tap Water</h2>\n        <p>Chlorine kills the <strong>beneficial bacteria</strong> in your filter. Always rinse in <strong>used tank water</strong>.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <p><strong>Share your "learning moments" below so we can all help each other!</strong> 👇</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:24:26.211+01	2026-01-11 08:24:26.22+01
d1ed3485-6af9-49f3-a89e-c27cf3690c04	Beginner Fish Keeping (Pt. 4): Choosing the Right Filter | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong> \n        Part 1 | Part 2 | Part 3 | <span style="color: #17a2b8;"><strong>Part 4</strong></span> | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #17a2b8; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #17a2b8; font-size: 28px;">Beginner Fish Keeping (Pt. 4): Choosing the Right Filter</h1>\n        <p style="font-style: italic; color: #666;">Keep your water clear with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>A filter is the life-support system for your fish. Here is how to choose between Sponge, HOB, and Canister filters.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #17a2b8; padding-left: 10px;">1. Hang-On-Back (HOB)</h2>\n        <p>Great for beginners; easy to maintain and provides excellent oxygen.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <p><strong>What filter are you running? Tell us your favorite brand!</strong> 👇</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:27:26.978+01	2026-01-11 08:27:26.987+01
24fd6147-1625-4521-8f55-c29879612690	Beginner Fish Keeping (Pt. 1): Setting Up Your First Tank | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong>\n        <span style="color: #0056b3;"><strong>Part 1</strong></span> | Part 2 | Part 3 | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #0056b3; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #0056b3; font-size: 28px;">Beginner Fish Keeping (Pt. 1): Setting Up Your First Tank</h1>\n        <p style="font-style: italic; color: #666;">Expert advice from <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>Welcome to the hobby! Setting up your first tank is an incredibly rewarding experience, but the first few weeks are critical. At <strong>The Aqua Guide (TAG)</strong>, we want to make sure your first dive into fish keeping is a success.</p>\n        <p>Whether you're looking for a peaceful desk setup or a vibrant living room centerpiece, here is everything you need to know to get started.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #0056b3; padding-left: 10px;">1. Size Matters (More Than You Think)</h2>\n        <p>A common beginner mistake is thinking a smaller tank is easier. In reality, <strong>larger tanks (20 gallons or more)</strong> are much more forgiving.</p>\n        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Start with at least a 10 or 20-gallon tank to give yourself a "safety net" while you learn to balance water chemistry.\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #0056b3; padding-left: 10px;">2. Understanding the Nitrogen Cycle</h2>\n        <p>This is the most important step in fish keeping. You must "cycle" the tank first to grow beneficial bacteria.</p>\n        <ul>\n            <li><strong>Step 1:</strong> Set up your tank with conditioned water.</li>\n            <li><strong>Step 2:</strong> Add a source of ammonia (like fish food).</li>\n            <li><strong>Step 3:</strong> Use a test kit until Ammonia and Nitrite are at 0.</li>\n        </ul>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #0056b3;">Join the TAG Community!</h3>\n        <p><strong>What fish are you planning to get for your first tank? Let us know below! 👇</strong></p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#FishKeeping #TheAquaGuide #TAG #FishTankSetup</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:23:51.852+01	2026-01-11 08:23:51.861+01
f6538b61-8203-493a-a46d-3fa3355c57ea	Beginner Fish Keeping (Pt. 3): Best Easy Live Plants | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong> \n        Part 1 | Part 2 | <span style="color: #28a745;"><strong>Part 3</strong></span> | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #28a745; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #28a745; font-size: 28px;">Beginner Fish Keeping (Pt. 3): Best Easy Live Plants</h1>\n        <p style="font-style: italic; color: #666;">Elevate your aquascape with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>Live plants aren't just for experts! Here are the top "indestructible" plants for your first tank.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #28a745; padding-left: 10px;">1. Java Fern</h2>\n        <p>Incredibly hardy. <strong>Do not bury its roots!</strong> Tie it to driftwood or rocks.</p>\n        <blockquote style="background: #f0fff4; border-left: 10px solid #28a745; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Use gel superglue to attach Java Fern to decor!\n        </blockquote>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <p><strong>Do you prefer a natural look or colorful decor? Share your photos!</strong> 👇</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:24:51.288+01	2026-01-11 08:24:51.296+01
48ec89f0-4288-4989-89bb-8baf50487a58	Beginner Fish Keeping (Pt. 5): Understanding Water Testing | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong> \n        Part 1 | Part 2 | Part 3 | Part 4 | <span style="color: #6f42c1;"><strong>Part 5</strong></span> | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #6f42c1; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #6f42c1; font-size: 28px;">Beginner Fish Keeping (Pt. 5): Understanding Water Testing</h1>\n        <p style="font-style: italic; color: #666;">Clear water doesn't always mean healthy water. Learn with <strong>TAG</strong></p>\n    </header>\n\n    <section>\n        <p><em>"We don't keep fish, we keep water."</em> Master the Big Four: Ammonia, Nitrite, Nitrate, and pH.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #6f42c1; padding-left: 10px;">Ammonia &amp; Nitrite</h2>\n        <p>In a healthy tank, these must always be <strong>0 ppm</strong>. Anything else is dangerous.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <p><strong>Post your current readings below if you need help!</strong> 👇</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:27:44.33+01	2026-01-11 08:27:44.337+01
0f1bf04d-dba4-4a05-b3fb-7c4032d904c6	Beginner Fish Keeping (Pt. 6): Your Essential Maintenance Routine | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #f1f3f5; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #dee2e6; text-align: center;">\n        <strong>📖 TAG Beginner Series:</strong>\n        Part 1 | Part 2 | Part 3 | Part 4 | Part 5 | <span style="color: #fd7e14;"><strong>Part 6</strong></span>\n    </div>\n\n    <header style="border-bottom: 2px solid #fd7e14; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #fd7e14; font-size: 28px;">Beginner Fish Keeping (Pt. 6): Your Maintenance Routine</h1>\n        <p style="font-style: italic; color: #666;">Consistency is the secret to a clear tank by <strong>TAG</strong></p>\n    </header>\n\n    <section>\n        <p>Keep your tank thriving with our Daily, Weekly, and Monthly checklist.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #fd7e14; padding-left: 10px;">Weekly Reset</h2>\n        <p>Replace 20-25% of the water and scrape the glass to maintain the ecosystem.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <p><strong>Series Complete! Post a photo of your clean tank below!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#AquariumSuccess #TheAquaGuide #TAG #FishKeeping</p>\n    </footer>\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:28:11.874+01	2026-01-11 08:28:11.881+01
a89f00ac-f622-49d4-b420-e0e145f86fe6	📚 The Ultimate Beginner Fish Keeping Series: Complete Guide Index | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #343a40; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #343a40; font-size: 28px;">Master the Hobby: The Beginner Fish Keeping Series Index</h1>\n        <p style="font-style: italic; color: #666;">Everything you need to go from beginner to pro by <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">\n        <p>New to the hobby? Don't get overwhelmed! We have organized our 6-part foundation series into this master list. Bookmark this page so you can refer back to it as your tank grows.</p>\n    </section>\n\n    <section style="margin-top: 30px;">\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/24fd6147-1625-4521-8f55-c29879612690" style="color: #0056b3; text-decoration: none;">Part 1: Setting Up Your First Tank</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Learn why size matters, the importance of the Nitrogen Cycle, and the essential gear you need to buy first.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/8746e5a9-b8dd-47b9-b2ac-bc0c239418f4" style="color: #dc3545; text-decoration: none;">Part 2: 5 Common Mistakes to Avoid</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">The survival guide. We cover overfeeding, filter maintenance, and the "silent killers" that beginners often miss.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/f6538b61-8203-493a-a46d-3fa3355c57ea" style="color: #28a745; text-decoration: none;">Part 3: Best Easy Live Plants</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Ditch the plastic! A guide to the top 5 "indestructible" live plants that help keep your water clean and your fish happy.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/d1ed3485-6af9-49f3-a89e-c27cf3690c04" style="color: #17a2b8; text-decoration: none;">Part 4: Choosing the Right Filter</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">A breakdown of Sponge, HOB, and Canister filters. Find out which one fits your specific tank size and budget.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/48ec89f0-4288-4989-89bb-8baf50487a58" style="color: #6f42c1; text-decoration: none;">Part 5: Understanding Water Testing</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">No chemistry degree required. Learn how to read your test kits and what Ammonia, Nitrite, and pH actually do to your fish.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="https://theaquaguide.com/view/forum/0f1bf04d-dba4-4a05-b3fb-7c4032d904c6" style="color: #fd7e14; text-decoration: none;">Part 6: Your Essential Maintenance Routine</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">The Roadmap to long-term success. A simple daily, weekly, and monthly checklist to keep your tank crystal clear.</p>\n        </div>\n\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #343a40; color: white; border-radius: 8px; text-align: center;">\n        <h3 style="margin-top: 0;">Still have questions?</h3>\n        <p>Our community is here to help! Visit the full library at <strong><a href="https://theaquaguide.com">www.theaquaguide.com</a></strong> for deep-dive articles on specific fish species and advanced aquascaping.</p>\n        <p><strong>Which part of the series helped you the most? Let us know in the comments below!</strong> 👇</p>\n        <p style="color: #bbb; font-size: 12px; margin-top: 15px;">#TheAquaGuide #TAG #FishKeepingSeries #AquariumGuide #BeginnerFishKeeping</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:33:07.952+01	2026-01-11 08:33:07.961+01
e1080e35-09ea-4789-b51f-cccde1d7aa70	🏆 Announcing: The TAG Tank of the Month Contest! | Share Your Setup	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #ffc107; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">🏆 Show Us Your Tank: The <span style="color: #ffc107;">TAG</span> Tank of the Month Contest</h1>\n        <p style="font-style: italic; color: #666;">Celebrating our community’s hard work with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>You’ve read the guides, cycled your tanks, and added your favorite fish—now it’s time to show off your hard work! Whether you have a 5-gallon Betta sanctuary or a 100-gallon planted masterpiece, we want to see it.</p>\n\n        <p>At <strong>The Aqua Guide (TAG)</strong>, we believe every tank has a story. Our monthly contest is designed to inspire others and highlight the creativity of our members.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #ffc107; padding-left: 10px;">How to Enter</h2>\n        <p>Entering is simple! Just reply to this thread with the following:</p>\n        <ul style="list-style-type: check; padding-left: 20px;">\n            <li><strong>The Photo:</strong> One clear, full-tank shot (FTS).</li>\n            <li><strong>The Specs:</strong> Tank size, filter type, and lighting.</li>\n            <li><strong>The Inhabitants:</strong> Tell us who lives in the tank!</li>\n            <li><strong>The TAG Guide:</strong> Mention one tip from our <em>Beginner Series</em> that helped you set this up.</li>\n        </ul>\n        <blockquote style="background: #fffdf5; border-left: 10px solid #ffc107; margin: 1.5em 10px; padding: 1em;">\n            <strong>Pro Tip:</strong> Clean your glass and turn off the room lights before taking the photo to avoid glares!\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #ffc107; padding-left: 10px;">Winner Perks</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #2c3e50; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Reward</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Details</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Forum Badge</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">A "TOTM Winner" badge added to your profile.</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>TAG Spotlight</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Your tank featured on the <a href="https://theaquaguide.com" style="color: #0056b3;">theaquaguide.com</a> homepage.</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Series Shoutout</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">We’ll use your tank as a "Success Example" in future posts!</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #ffc107; padding-left: 10px;">The Ground Rules</h2>\n        <p>1. Must be your own personal tank. <br>\n            2. One entry per member per month. <br>\n            3. Photos must be current (taken within the last 30 days).</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Submissions close on the 25th!</h3>\n        <p>Winners will be announced on the 1st of next month. We can't wait to see your underwater worlds!</p>\n        <p><strong>Ready to show off? Post your photo and specs below to enter!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#TAGTOTM #TankOfTheMonth #TheAquaGuide #AquascapeContest #FishKeepingCommunity</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:47:50.816+01	2026-01-11 08:47:50.828+01
ae9c0c88-a76e-42ad-8618-d7af8a102bb2	🛠️ Product Review: The 5 Best Filters for a 20-Gallon Tank (2026 Edition) | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #20c997; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">🛠️ Gear Review: Top 5 Filters for Your 20-Gallon Setup</h1>\n        <p style="font-style: italic; color: #666;">Tested and approved by <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>A 20-gallon tank is the perfect "sweet spot," but it requires the right amount of turnover to stay clean. You need a filter that handles at least 100–150 GPH (Gallons Per Hour).</p>\n\n        <p>At <strong>The Aqua Guide (TAG)</strong>, we’ve tested dozens of models for noise level, durability, and ease of maintenance. Here are our top picks for 2026.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #20c997; padding-left: 10px;">1. The All-Rounder: AquaClear 50</h2>\n        <p>The "gold standard" for Hang-On-Back filters. Its large media basket allows you to customize your mechanical, chemical, and biological filtration easily.</p>\n        <p><strong>Pros:</strong> Huge space for beneficial bacteria; virtually indestructible motor.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #20c997; padding-left: 10px;">2. The Silent Performer: Seachem Tidal 35</h2>\n        <p>This filter features a self-priming pump and a surface skimmer that keeps the water's surface free of oily films.</p>\n        <p><strong>Pros:</strong> Extremely quiet; includes a maintenance alert feature.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #20c997; padding-left: 10px;">Quick Specs Comparison</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #20c997; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Model</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Type</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Best Feature</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>AquaClear 50</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">HOB</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Custom Media Space</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Seachem Tidal 35</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">HOB</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Built-in Skimmer</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fluval 107</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Canister</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Maximum Filtration</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Oase BioPlus 100</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Internal</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Hidden/Sleek Look</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Dual Sponge Filter</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Sponge</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Shrimp/Fry Safe</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <blockquote style="background: #e6fffa; border-left: 10px solid #20c997; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> When buying a filter for a 20-gallon tank, always "over-filter." Buying a model rated for 30–50 gallons ensures your water stays cleaner for longer.\n        </blockquote>\n        <p>For the full deep-dive review and setup videos for each of these, check out the gear section at <a href="https://theaquaguide.com" style="color: #0056b3; font-weight: bold;">theaquaguide.com</a>.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Which one is on your wishlist?</h3>\n        <p>Choosing the right gear is the first step toward a thriving tank. <strong>What filter are you currently using on your 20-gallon? Drop a comment below!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#AquariumReviews #BestFilter #TheAquaGuide #TAG #FishGear #20GallonTank</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:49:39.083+01	2026-01-11 08:49:39.092+01
6d62ddcc-9eb3-41b3-b329-968247047603	🧪 Troubleshooting: How to Get Rid of Brown Algae Fast | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <header style="border-bottom: 2px solid #856404; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #856404; font-size: 28px;">Ugly Brown Algae? Don't Panic! How to Clear Diatoms Fast</h1>\n        <p style="font-style: italic; color: #666;">Practical troubleshooting by <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>You’ve followed the guides, cycled your tank, and suddenly... everything is covered in a dusty brown film. It’s on the glass, the plants, and the gravel. It looks terrible, but here is the good news: <strong>It’s not actually algae, and it’s not permanent.</strong></p>\n        \n        <p>At <strong>The Aqua Guide (TAG)</strong>, we call this the "New Tank Phase." These are actually <strong>Diatoms</strong>, and they are a sign that your tank is maturing. Here is how to handle them.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #856404; padding-left: 10px;">Why is this happening?</h2>\n        <p>Diatoms feed on <strong>Silicates</strong>. New glass tanks and new sand substrates leach silicates into the water. Once the diatoms consume all the available silicates, they will starve and disappear on their own.</p>\n        <blockquote style="background: #fff3cd; border-left: 10px solid #856404; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Fact:</strong> Unlike green algae, brown diatoms don't need much light. Leaving your lights off won't necessarily kill them, but it can help slow them down.\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #856404; padding-left: 10px;">The 3-Step Cleaning Plan</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #856404; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Action</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">How it Works</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Manual Removal</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Gently wipe the glass and ornaments; the brown dust comes off easily.</td>\n                </tr>\n                <tr style="background-color: #fcf8e3;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Increase Water Flow</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Diatoms hate high-flow areas. Adjust your filter intake for better circulation.</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Natural Predators</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Otocinclus Catfish and Nerite Snails <em>love</em> eating brown diatoms.</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #856404; padding-left: 10px;">Will it come back?</h2>\n        <p>In most cases, no. Once your tank is "seasoned" (usually after 2–3 months), diatoms rarely return. If they do, it's a sign that your tap water might be high in silicates or your nitrates are peaking.</p>\n        <p>For a full list of "Algae Eaters" that fit your tank size, visit the biological control guide at <a href="https://theaquaguide.com" style="color: #0056b3; font-weight: bold;">theaquaguide.com</a>.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #856404;">Is your tank "turning brown"?</h3>\n        <p>Don't let it discourage you! It’s just a phase on the way to a beautiful ecosystem.</p>\n        <p><strong>Post a photo of your algae struggle below—let our community help you identify if it's Diatoms or something else!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#BrownAlgae #Diatoms #AquariumTroubleshooting #TheAquaGuide #TAG #NewTankSyndrome</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 08:50:31.427+01	2026-01-11 08:50:31.437+01
9313e08c-2fe8-459a-8920-b047d17cad7b	The Perfect Match (Pt. 1): 5 Best Centerpiece Fish for Beginners | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong>\n        <span style="color: #007bff;"><strong>Part 1</strong></span> | Part 2 | Part 3 | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 1): 5 Best Centerpiece Fish</h1>\n        <p style="font-style: italic; color: #666;">Choosing the star of your aquarium with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>Every great aquarium needs a "star"—a single fish or a pair that stands out due to their color, size, or personality. However, many stunning fish are either too aggressive or too sensitive for a new hobbyist.</p>\n\n        <p>At <strong>The Aqua Guide (TAG)</strong>, we’ve selected 5 species that offer "wow factor" without the expert-level difficulty. These are the perfect centerpiece fish for a 20-gallon community tank.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">1. The Honey Gourami</h2>\n        <p>Unlike their larger cousins, Honey Gouramis are peaceful and stay small (about 2 inches). Their sunset-orange glow makes them pop against green plants.</p>\n        <p><strong>TAG Note:</strong> They are social but can be kept as a single centerpiece or a bonded pair.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">2. The Dwarf Gourami (Powder Blue or Flame)</h2>\n        <p>These fish are bred for intense color. They are intelligent and often "feel" their environment with their long, thread-like pelvic fins.</p>\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Keep only one male Dwarf Gourami per tank to avoid territorial fighting.\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Centerpiece Quick Stats</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Fish Species</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Min. Tank</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Temperament</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Honey Gourami</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">10 Gallons</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Peaceful</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Dwarf Gourami</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">20 Gallons</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Semi-Aggressive</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Bolivian Ram</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">20 Gallons</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Peaceful Cichlid</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fancy Guppy (Male)</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">5 Gallons</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Active/Peaceful</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">3. Bolivian Ram &amp; 4. Apistogramma</h2>\n        <p>If you want to try "dwarf cichlids," the Bolivian Ram is much hardier than the German Blue Ram. They occupy the bottom and middle of the tank and have wonderful parental instincts if they pair up.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Who is the star of your tank?</h3>\n        <p>Choosing a centerpiece is a big decision! Need help checking compatibility with your current fish? Head to <strong>theaquaguide.com</strong> for our full compatibility tool.</p>\n        <p><strong>Post a photo of your favorite centerpiece fish below and tell us their name!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#CenterpieceFish #Gourami #BolivianRam #TheAquaGuide #TAG #AquariumStocking</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:02:49.496+01	2026-01-11 09:02:49.507+01
1c27d3a9-0ef0-479b-9c80-8c48b96a7182	The Perfect Match (Pt. 2): Schooling Fish That Actually School | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong>\n        Part 1 | <span style="color: #007bff;"><strong>Part 2</strong></span> | Part 3 | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 2): Schooling Fish That Actually School</h1>\n        <p style="font-style: italic; color: #666;">Creating movement and energy with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>Many beginners buy a "mix and match" of single fish, only to find their tank looks cluttered and messy. The secret to a professional-looking aquarium is <strong>The Schooling Effect.</strong></p>\n\n        <p>At <strong>The Aqua Guide (TAG)</strong>, we distinguish between "shoaling" (hanging out together) and "schooling" (swimming in a tight, synchronized pack). Here are our top picks for fish that stay tight and look stunning.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">1. Rummy Nose Tetra (The Gold Standard)</h2>\n        <p>If you want a fish that moves like a single organism, the Rummy Nose is king. They are famous for their bright red heads and "checkerboard" tails. They are also great "canary" fish—if their red faces turn pale, it’s a sign your water quality needs checking!</p>\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> For the best effect, keep a group of at least 8–10. In a 20-gallon tank, a dozen Rummy Noses looks incredible.\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">2. Harlequin Rasboras</h2>\n        <p>With their distinct black "pork chop" shape and copper-orange bodies, Harlequins are extremely hardy and peaceful. They occupy the upper-middle section of the tank, making them perfect companions for bottom-dwellers.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Schooling Stats at a Glance</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Species</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">School Tightness</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Hardiness</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Rummy Nose Tetra</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Excellent (10/10)</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Medium</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Harlequin Rasbora</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Good (7/10)</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Very High</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Cardinal Tetra</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Moderate (6/10)</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Low (Needs stability)</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Cherry Barb</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Loose (4/10)</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Very High</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">3. Cardinal Tetras</h2>\n        <p>Often confused with Neons, Cardinals have a red stripe that runs the full length of their body. While they don't school as tightly as Rummy Noses, their electric blue and red glow is unmatched in a planted tank.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Strength in Numbers!</h3>\n        <p>Remember: Most small fish only feel safe when they are in a group. A stressed fish hides; a happy fish schools!</p>\n        <p><strong>Do you prefer a large group of one species, or several small groups of different fish? Tell us your preference below!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#SchoolingFish #Tetras #Rasboras #TheAquaGuide #TAG #AquariumCommunity</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:04:16.542+01	2026-01-11 09:04:16.549+01
1b82b8c4-63a6-4334-8109-7799da53de10	The Perfect Match (Pt. 3): The Ultimate Clean-Up Crew | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong> \n        Part 1 | Part 2 | <span style="color: #007bff;"><strong>Part 3</strong></span> | Part 4 | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 3): The Ultimate Clean-Up Crew</h1>\n        <p style="font-style: italic; color: #666;">Put your ecosystem to work with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>A healthy aquarium is a busy one! While you should always handle your weekly water changes, certain fish and invertebrates act as a "janitorial staff," eating algae off the glass and scavenging for food trapped in the gravel.</p>\n        \n        <p>At <strong>The Aqua Guide (TAG)</strong>, we recommend choosing a crew that covers all three zones: the glass, the plants, and the substrate.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">1. Corydoras (The Substrate Scavengers)</h2>\n        <p>Cory catfish are the heart of the clean-up crew. They spend 100% of their time wiggling along the bottom, sniffing out leftover flakes that your tetras missed. They are peaceful, hardy, and incredibly fun to watch.</p>\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Corydoras have sensitive whiskers (barbels). Always use <strong>sand</strong> or smooth gravel to keep them healthy and happy!\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">2. Nerite Snails (The Glass Specialists)</h2>\n        <p>If you hate scraping algae, Nerite snails are your best friends. They are "obligate" algae eaters, meaning they won't stop until your glass and rocks are polished. Best of all? They cannot reproduce in freshwater, so you won't end up with a snail outbreak.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Crew Roles at a Glance</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Member</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Primary Job</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Best For</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Corydoras</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Scavenging food</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Sand bottoms</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nerite Snail</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Glass/Rock Algae</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">No reproduction</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amano Shrimp</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Hair/Brush Algae</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Planted tanks</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Otocinclus</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Diatom eating</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Small tanks</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">3. Amano Shrimp (The Detailers)</h2>\n        <p>Amano shrimp are the "power-washers" of the plant world. They have tiny claws that can pick hair algae and debris off delicate leaves without damaging the plant itself. They are much hardier than Cherry Shrimp and live longer, too.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Teamwork makes the dream work!</h3>\n        <p>Remember: You still have to feed your Clean-Up Crew! Don't assume they can live on "scraps" alone—give them sinking wafers twice a week.</p>\n        <p><strong>Who is currently on your cleaning staff? Are you a snail person or a shrimp person? Let us know!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#CleanUpCrew #Corydoras #AmanoShrimp #TheAquaGuide #TAG #AquariumMaintenance</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:05:06.927+01	2026-01-11 09:05:06.935+01
2347c024-5d62-4bf1-96e0-457735e869a5	The Perfect Match (Pt. 4): Understanding Fish Temperament | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong> \n        Part 1 | Part 2 | Part 3 | <span style="color: #007bff;"><strong>Part 4</strong></span> | Part 5 | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 4): Decoding Fish Temperament</h1>\n        <p style="font-style: italic; color: #666;">Keeping the peace with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>You see a beautiful fish at the shop, but the tag says <strong>"Semi-Aggressive."</strong> Does that mean it will kill everything, or just stand its ground? Understanding temperament is the key to a stress-free aquarium.</p>\n        \n        <p>At <strong>The Aqua Guide (TAG)</strong>, we categorize fish behavior into four main levels to help you build a compatible community.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">The 4 Levels of Behavior</h2>\n        \n        <div style="margin-bottom: 15px;">\n            <strong>🟢 Peaceful:</strong> These fish have zero interest in fighting. They are perfect for "community" tanks. \n            <br><em>Examples: Corydoras, Guppies, Honey Gouramis.</em>\n        </div>\n\n        <div style="margin-bottom: 15px;">\n            <strong>🟡 Semi-Aggressive:</strong> These fish aren't "mean," but they are <strong>territorial</strong>. They will chase others away from their "spot" or if the tank is too crowded. \n            <br><em>Examples: Dwarf Cichlids, Shark Minnows, Angelfish.</em>\n        </div>\n\n        <div style="margin-bottom: 15px;">\n            <strong>🟠 Fin-Nippers:</strong> These aren't necessarily aggressive, but they are "pushy." They will peck at fish with long, flowing fins (like Bettas or Fancy Guppies). \n            <br><em>Examples: Tiger Barbs, Serpae Tetras.</em>\n        </div>\n\n        <div style="margin-bottom: 15px;">\n            <strong>🔴 Aggressive/Predatory:</strong> These fish will eat anything that fits in their mouth or fight to the death over territory.\n            <br><em>Examples: Large Cichlids, Red Tail Sharks.</em>\n        </div>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Compatibility Cheat Sheet</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Match-Up</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Compatibility</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">TAG Advice</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Peaceful + Peaceful</td>\n                    <td style="padding: 10px; border: 1px solid #ddd; color: green;"><strong>Perfect</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">The easiest way to start!</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;">Peaceful + Semi-Aggro</td>\n                    <td style="padding: 10px; border: 1px solid #ddd; color: orange;"><strong>Caution</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Requires a large tank and plenty of hiding spots.</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Nippers + Flowing Fins</td>\n                    <td style="padding: 10px; border: 1px solid #ddd; color: red;"><strong>Avoid</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Will lead to torn fins and infection.</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">The "Sight Line" Secret</h2>\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Pro Tip:</strong> If you have a territorial fish, use tall plants or driftwood to <strong>break the line of sight</strong>. If a fish can't see its "rival" from across the tank, it is much less likely to attack.\n        </blockquote>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Is your tank a "Zen Zone" or a "War Zone"?</h3>\n        <p>Before you buy that "cool looking fish," ask yourself if it matches the energy of your current inhabitants.</p>\n        <p><strong>Are you dealing with a bully in your tank? Describe the situation below, and the TAG community will help you find a solution!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#FishTemperament #AquariumCompatibility #CommunityTank #TheAquaGuide #TAG #FishBehavior</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:06:14.513+01	2026-01-11 09:06:14.519+01
6313c493-537b-4ddf-9bc5-2a64929d8028	The Perfect Match (Pt. 5): Nano Fish for Small Spaces | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong>\n        Part 1 | Part 2 | Part 3 | Part 4 | <span style="color: #007bff;"><strong>Part 5</strong></span> | Part 6\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 5): Nano Fish for Small Spaces</h1>\n        <p style="font-style: italic; color: #666;">Small wonders and tiny treasures with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>A "Nano Tank" (usually 10 gallons or less) is a beautiful way to bring nature into a small office or bedroom. However, a small tank doesn't mean you can just pick "baby" versions of large fish. You need species that <em>stay</em> small.</p>\n\n        <p>At <strong>The Aqua Guide (TAG)</strong>, we look for fish that have a small bioload but big personalities. Here are our top 3 picks for nano systems.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">1. Chili Rasboras (Boraras brigittae)</h2>\n        <p>These are true tiny titans, barely reaching 0.7 inches. In a group of 10, their deep crimson color creates a stunning contrast against green moss. They are extremely peaceful and have a very low impact on your water quality.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">2. Celestial Pearl Danios (CPDs)</h2>\n        <p>Often called "Galaxy Rasboras," these fish look like miniature trout with gold spots and bright orange fins. They can be a bit shy, so they thrive in tanks with plenty of live plants to hide in.</p>\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Tip:</strong> Nano fish are sensitive to water swings. Because small tanks have less water volume, we recommend testing your parameters twice a week!\n        </blockquote>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Nano Species Guide</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Species</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Max Size</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Ideal Tank</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Chili Rasbora</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">0.75 Inches</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">5+ Gallons</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Celestial Pearl Danio</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">1.0 Inch</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">10 Gallons</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Endlers Livebearer</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">1.0 Inch</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">5+ Gallons</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Scarlet Badis</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">0.8 Inches</td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">5 Gallons (Expert)</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">3. Endlers Livebearers</h2>\n        <p>Think of these as the high-energy cousins of the Guppy. They are incredibly hardy, extremely active, and come in neon colors that seem to glow. They are the perfect "first fish" for a small desktop setup.</p>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Big things come in small packages!</h3>\n        <p>A nano tank is a challenge, but seeing a tiny school of Rasboras move through the plants is incredibly rewarding.</p>\n        <p><strong>Are you a "Big Tank" person or a "Nano Tank" enthusiast? Show us your small setups in the comments below!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#NanoTank #ChiliRasbora #CPD #TheAquaGuide #TAG #SmallAquarium</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:07:48.607+01	2026-01-11 09:07:48.614+01
6effdb29-41e0-4c15-a51f-9c18e283ad91	The Perfect Match (Pt. 6): The Ultimate 20-Gallon Stocking Guide | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <div style="background: #eef2f7; padding: 10px; border-radius: 5px; font-size: 14px; margin-bottom: 20px; border: 1px solid #d1d9e6; text-align: center;">\n        <strong>🐠 TAG Perfect Match Series:</strong> \n        Part 1 | Part 2 | Part 3 | Part 4 | Part 5 | <span style="color: #007bff;"><strong>Part 6</strong></span>\n    </div>\n\n    <header style="border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #2c3e50; font-size: 28px;">The Perfect Match (Pt. 6): Stocking Your 20-Gallon Community</h1>\n        <p style="font-style: italic; color: #666;">Bringing the vision to life with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section>\n        <p>We’ve covered the theory—now it’s time for the application. A 20-gallon "High" or "Long" tank is the most popular size for beginners, but filling it requires a delicate balance of <strong>Bioload</strong> and <strong>Swimming Space.</strong></p>\n        \n        <p>At <strong>The Aqua Guide (TAG)</strong>, we’ve designed three "proven blueprints" that ensure a peaceful, colorful, and sustainable community.</p>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Blueprint A: The Tropical Sunset (Peaceful)</h2>\n        <p>This setup is focused on bright, warm colors and very low aggression.</p>\n        <ul style="list-style-type: none; padding-left: 10px;">\n            <li>🔥 <strong>1x Honey Gourami</strong> (The Centerpiece)</li>\n            <li>✨ <strong>8x Harlequin Rasboras</strong> (The School)</li>\n            <li>🎖️ <strong>6x Panda Corydoras</strong> (The Bottom Crew)</li>\n            <li>🐚 <strong>1x Nerite Snail</strong> (The Glass Cleaner)</li>\n        </ul>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">Blueprint B: The Amazon River (Active)</h2>\n        <p>Best for a 20-gallon "Long" tank, this setup emphasizes movement and shimmering blues.</p>\n        <ul style="list-style-type: none; padding-left: 10px;">\n            <li>💎 <strong>1x Bolivian Ram</strong> (The Centerpiece)</li>\n            <li>🔴 <strong>10x Rummy Nose Tetras</strong> (The School)</li>\n            <li>🦐 <strong>5x Amano Shrimp</strong> (The Detailers)</li>\n        </ul>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <h2 style="color: #2c3e50; border-left: 5px solid #007bff; padding-left: 10px;">The TAG Stocking Rules</h2>\n        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">\n            <thead>\n                <tr style="background-color: #007bff; color: white; text-align: left;">\n                    <th style="padding: 12px; border: 1px solid #ddd;">Rule</th>\n                    <th style="padding: 12px; border: 1px solid #ddd;">Why it Matters</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>The 1-Inch Myth</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Forget "1 inch per gallon." Focus on activity levels and bioload instead.</td>\n                </tr>\n                <tr style="background-color: #f2f2f2;">\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>The 2-Week Gap</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Never add all your fish at once. Add the school first, wait 2 weeks, then the rest.</td>\n                </tr>\n                <tr>\n                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Vertical Layers</strong></td>\n                    <td style="padding: 10px; border: 1px solid #ddd;">Ensure you have Top, Middle, and Bottom dwellers to avoid crowding.</td>\n                </tr>\n            </tbody>\n        </table>\n    </section>\n\n    <section style="margin-top: 25px;">\n        <blockquote style="background: #f0f7ff; border-left: 10px solid #007bff; margin: 1.5em 10px; padding: 1em;">\n            <strong>TAG Pro Tip:</strong> Always stock the most peaceful fish first. If you add the "boss" (the centerpiece) last, they are less likely to claim the whole tank as their territory!\n        </blockquote>\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">\n        <h3 style="color: #2c3e50;">Which blueprint fits your style?</h3>\n        <p>Stocking is an art, not just a science. If you have a custom stocking idea, post it below and our team will give you a "Compatibility Check!"</p>\n        <p><strong>Reply with your current or planned 20-gallon stock list!</strong> 👇</p>\n        <p style="color: #888; font-size: 12px; margin-top: 15px;">#20GallonStocking #AquariumCommunity #FishKeeping #TheAquaGuide #TAG #PerfectMatch</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:09:04.35+01	2026-01-11 09:09:04.36+01
d6c1735a-8dc3-44c9-8a42-67ee8a713dbb	🐠 The Perfect Match: Species & Compatibility Series Index | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #343a40; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #343a40; font-size: 28px;">The Perfect Match: Species &amp; Compatibility Series Index</h1>\n        <p style="font-style: italic; color: #666;">Mastering your tank's ecosystem with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">\n        <p>Ready to stock your tank? This 6-part series is your roadmap to choosing compatible, healthy, and vibrant fish. Bookmark this index to help you plan your community as you grow.</p>\n    </section>\n\n    <section style="margin-top: 30px;">\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #0056b3; text-decoration: none;">Part 1: 5 Best Centerpiece Fish</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Meet the stars of the show! We look at hardy, stunning options like Honey Gouramis and Bolivian Rams for your first focal point.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #dc3545; text-decoration: none;">Part 2: Schooling Fish That Actually School</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Create movement and energy with synchronized swimmers. A guide to Rummy Nose Tetras, Harlequin Rasboras, and more.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #28a745; text-decoration: none;">Part 3: The Ultimate Clean-Up Crew</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Put your ecosystem to work. Learn which snails, shrimp, and catfish will keep your glass and substrate spotless.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #17a2b8; text-decoration: none;">Part 4: Understanding Fish Temperament</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Decode "Semi-Aggressive" labels and learn how to break sightlines to keep a peaceful, stress-free aquarium.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #6f42c1; text-decoration: none;">Part 5: Nano Fish for Small Spaces</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">Think small! The best species for 5 and 10-gallon setups, including Chili Rasboras and Celestial Pearl Danios.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px;"><a href="#" style="color: #fd7e14; text-decoration: none;">Part 6: Stocking Your 20-Gallon Community</a></h3>\n            <p style="margin-top: 0; font-size: 14px;">The grand finale blueprints. We provide three proven stocking lists to ensure your 20-gallon tank thrives.</p>\n        </div>\n\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #343a40; color: white; border-radius: 8px; text-align: center;">\n        <h3 style="margin-top: 0;">Need a Compatibility Check?</h3>\n        <p>Our community is here to help! Visit <strong>theaquaguide.com</strong> or post your stocking list below for expert feedback.</p>\n        <p><strong>Which of these species are you most excited to keep? Let us know!</strong> 👇</p>\n        <p style="color: #bbb; font-size: 12px; margin-top: 15px;">#TheAquaGuide #TAG #PerfectMatch #FishCompatibility #AquariumStocking</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 09:14:58.095+01	2026-01-11 09:14:58.107+01
485d9926-225e-4b69-b760-2706b39f0c59	🎨 Aquascaping Masterclass (Pt. 1): Hardscape Fundamentals | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n    \n    <header style="border-bottom: 2px solid #343a40; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #343a40; font-size: 28px;">Aquascaping Masterclass: Pt. 1 - Hardscape Fundamentals</h1>\n        <p style="font-style: italic; color: #666;">Designing the "bones" of your aquarium with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">\n        <p>Before the first plant is tucked into the soil, the <strong>Hardscape</strong> defines the soul of your tank. This guide covers how to use rocks and wood to create a professional-looking environment from day one.</p>\n    </section>\n\n    <section style="margin-top: 30px;">\n        \n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">1. The Rule of Thirds</h3>\n            <p style="margin-top: 0; font-size: 14px;">Avoid placing your main feature (focal point) directly in the center; it looks stagnant. Instead, divide your tank into a 3x3 grid and place your primary rock or wood piece on one of the intersecting lines to create natural movement.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">2. Substrate Sloping for Depth</h3>\n            <p style="margin-top: 0; font-size: 14px;">A flat sand bed makes the tank look shallow. Pile your substrate higher toward the back corners (3–5 inches) and keep it thin at the front (1 inch). This "slope" creates an optical illusion of incredible depth.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">3. Choosing Your Materials</h3>\n            <p style="margin-top: 0; font-size: 14px;">Stick to one type of stone (e.g., Seiryu Stone or Dragon Stone) and one type of wood (e.g., Driftwood or Spider Wood). Mixing too many textures makes the tank look cluttered rather than cohesive.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">4. The "Dry Start" Layout</h3>\n            <p style="margin-top: 0; font-size: 14px;">Never arrange your hardscape inside a full tank. Always layout your rocks and wood while the tank is empty. Take a photo, step back, and adjust until the "skeleton" looks perfect on its own.</p>\n        </div>\n\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #343a40; color: white; border-radius: 8px; text-align: center;">\n        <h3 style="margin-top: 0;">Show Us Your Layout!</h3>\n        <p>Hardscaping is where the art begins. Visit <strong>theaquaguide.com</strong> for more advanced layout templates and inspiration galleries.</p>\n        <p><strong>Are you a fan of the "Iwagumi" rock style or a "Jungle" wood look? Let's discuss below!</strong> 👇</p>\n        <p style="color: #bbb; font-size: 12px; margin-top: 15px;">#TheAquaGuide #TAG #Aquascaping #Hardscape #AquariumDesign #Masterclass</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 10:13:20.752+01	2026-01-11 10:13:20.764+01
fe3b9ff0-81e7-4f88-84c2-bb1c10c3f675	Aquascaping Masterclass (Pt. 2): Plant Placement & Grouping	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #343a40; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #343a40; font-size: 28px;">Aquascaping Masterclass: Pt. 2 - Plant Placement &amp; Grouping</h1>\n        <p style="font-style: italic; color: #666;">Bringing your scape to life with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">\n        <p>Now that your hardscape is set, it's time to "paint" with plants. Professional aquascapers don't just scatter plants randomly; they organize them into three distinct zones to create a sense of scale and perspective.</p>\n    </section>\n\n    <section style="margin-top: 30px;">\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">1. The Foreground (The Carpet)</h3>\n            <p style="margin-top: 0; font-size: 14px;">Use low-growing plants like Dwarf Hairgrass or Monte Carlo here. This keeps the front of the tank open, allowing you to see your fish while providing a lush "lawn" effect that leads the eye into the tank.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">2. The Midground (The Transition)</h3>\n            <p style="margin-top: 0; font-size: 14px;">This is where you hide the "seams" between your rocks and wood. Anubias, Java Fern, and Cryptocoryne are perfect here. They add texture and volume without growing so tall that they block the background.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">3. The Background (The Frame)</h3>\n            <p style="margin-top: 0; font-size: 14px;">Tall, fast-growing stem plants like Amazon Swords or Vallisneria act as a natural curtain. They frame the scape and help absorb excess nutrients, which prevents algae outbreaks.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">4. Plant in "Drifts"</h3>\n            <p style="margin-top: 0; font-size: 14px;">Instead of one of each plant, buy 3 or 5 of the same species and plant them in a cluster. This looks far more natural and creates a "drift" of color that mimics how plants grow in the wild.</p>\n        </div>\n\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #343a40; color: white; border-radius: 8px; text-align: center;">\n        <h3 style="margin-top: 0;">Green Thumb or Brown Thumb?</h3>\n        <p>Don't be afraid to experiment! Plants can be moved. Visit <strong>theaquaguide.com</strong> for a full gallery of plant species sorted by height and light requirements.</p>\n        <p><strong>What is the one plant you just can't seem to keep alive? Let’s troubleshoot together!</strong> 👇</p>\n        <p style="color: #bbb; font-size: 12px; margin-top: 15px;">#TheAquaGuide #TAG #Aquascaping #PlantedTank #AquariumPlants #Masterclass</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 10:15:09.284+01	2026-01-11 10:15:09.292+01
8732f58b-4d28-4127-abca-5eed2e273056	Aquascaping Masterclass (Pt. 3): Substrate & Nutrition | TAG	<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">\n\n    <header style="border-bottom: 2px solid #343a40; padding-bottom: 20px; margin-bottom: 20px;">\n        <h1 style="color: #343a40; font-size: 28px;">Aquascaping Masterclass: Pt. 3 - Substrate &amp; Nutrition</h1>\n        <p style="font-style: italic; color: #666;">Feeding the roots of success with <strong>The Aqua Guide (TAG)</strong></p>\n    </header>\n\n    <section style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">\n        <p>Your plants are only as healthy as the "soil" they grow in. In this lesson, we break down the chemistry beneath the surface and how to ensure your plants don't just survive, but thrive.</p>\n    </section>\n\n    <section style="margin-top: 30px;">\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">1. Inert vs. Active Substrates</h3>\n            <p style="margin-top: 0; font-size: 14px;"><strong>Inert</strong> substrates (Sand/Gravel) don't provide nutrients but are easy to clean. <strong>Active</strong> substrates (Aqua-soils) contain baked volcanic soil that feeds plants directly but can lower your pH. Choose based on your plant selection!</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">2. The Root Tab Secret</h3>\n            <p style="margin-top: 0; font-size: 14px;">If you use sand or gravel, your "heavy feeders" (like Amazon Swords or Crypts) will starve. Root tabs are small fertilizer pellets you bury in the substrate every 3-4 inches to turn inert sand into a nutrient-rich garden.</p>\n        </div>\n\n        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">\n            <h3 style="margin-bottom: 5px; color: #28a745;">3. Liquid Fertilizer: The Foliar Route</h3>\n            <p style="margin-top: 0; font-size: 14px;">Plants like Anubias and Java Fern take nutrients from the water, not the soil. An "All-in-One" liquid fertilizer dosed once a week ensures these water-column feeders stay vibrant green and algae-free.</p>\n        </div>\n\n    </section>\n\n    <footer style="margin-top: 40px; padding: 25px; background-color: #343a40; color: white; border-radius: 8px; text-align: center;">\n        <h3 style="margin-top: 0;">What's Under Your Surface?</h3>\n        <p>Substrate is the foundation of your scape. Visit <strong>theaquaguide.com</strong> for our "Substrate Calculator" to see how many bags you need for your tank size.</p>\n        <p><strong>Are you a high-tech "Aqua-soil" scaper or a low-tech "Sand and Tabs" enthusiast? Let's hear it!</strong> 👇</p>\n        <p style="color: #bbb; font-size: 12px; margin-top: 15px;">#TheAquaGuide #TAG #Aquascaping #PlantNutrition #AquariumSubstrate #Masterclass</p>\n    </footer>\n\n</div>	57daae93-1144-43f2-9081-30858f3c95f7	{}	{}	f	approved	\N	\N	pending	\N	2026-01-11 10:19:58.554+01	2026-01-11 10:19:58.56+01
\.


--
-- TOC entry 3699 (class 0 OID 21731)
-- Dependencies: 295
-- Data for Name: FAQs; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."FAQs" (id, question, answers, created_by, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3700 (class 0 OID 21751)
-- Dependencies: 296
-- Data for Name: GuestConversions; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."GuestConversions" (id, guest_id, user_id, converted_at, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3690 (class 0 OID 19968)
-- Dependencies: 286
-- Data for Name: Guests; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Guests" (id, guest_name, ip_address, country_code, region, latitude, longitude, last_seen, "createdAt", "updatedAt") FROM stdin;
b4abab62-0165-4a79-9716-4ff089b73d49	guest7350	152.58.216.39	IN	Kochi, IN	9.918500	76.255800	2026-01-18 17:01:36.41+01	2026-01-18 17:01:35.578+01	2026-01-18 17:01:36.41+01
8d24aa9e-ce4a-4f8e-87f4-84805f46e195	guest9495	103.230.106.27	BD	Rajshahi, BD	24.449100	88.718600	2026-01-21 08:53:45.19+01	2026-01-21 08:52:32.591+01	2026-01-21 08:53:45.19+01
71fed55c-21cb-417e-b560-24ba906265d2	guest2760	223.187.55.63	IN	Penumantra, IN	16.639500	81.650600	2026-01-18 11:26:48.792+01	2026-01-18 11:26:48.811+01	2026-01-18 11:26:48.811+01
f651ceaf-9959-4688-a570-6298d2874c3c	guest8206	17.246.19.195	US	\N	37.751000	-97.822000	\N	2026-01-22 02:45:52.332+01	2026-01-22 02:45:52.332+01
b789de33-c628-473a-98fb-8a4c687cd6e1	guest4435	66.249.73.163	US	\N	37.751000	-97.822000	\N	2026-01-20 04:49:49.641+01	2026-01-20 04:49:49.641+01
41a23871-b5d4-4bb0-af39-efce8c2a3c9f	guest6290	66.249.73.165	US	\N	37.751000	-97.822000	\N	2026-01-18 11:39:21.783+01	2026-01-18 11:39:21.783+01
5905918e-16d8-44a1-91ce-be506d565e23	guest4494	157.51.214.57	IN	Chennai, IN	12.899600	80.220900	2026-01-21 08:56:57.975+01	2026-01-21 08:53:58.824+01	2026-01-21 08:56:57.975+01
91e48bfa-ceff-4bbc-a602-8478a84bfcb4	guest2953	157.51.215.137	IN	Chennai, IN	12.899600	80.220900	2026-01-19 07:43:18.155+01	2026-01-19 07:43:17.484+01	2026-01-19 07:43:18.156+01
95dc8f91-d822-419d-ab1d-441948f8f268	guest8057	65.55.210.40	US	Unknown, US	47.603400	-122.341400	2026-01-19 08:48:57.936+01	2026-01-19 08:48:57.987+01	2026-01-19 08:48:57.987+01
7c6d6a3d-1348-4eba-ba9e-5ea3b61da225	guest5698	115.114.104.218	IN	Hyderabad, IN	17.372400	78.437800	2026-01-21 14:38:19.293+01	2026-01-21 14:37:50.017+01	2026-01-21 14:38:19.293+01
4c301a1a-d789-4bc2-9009-9d9b3028b66d	guest4466	152.59.223.91	IN	Hyderabad, IN	17.372400	78.437800	2026-01-20 06:25:41.103+01	2026-01-20 06:24:44.93+01	2026-01-20 06:25:41.103+01
6e0e65a0-7675-4bf8-9fda-3afaefaf79bc	guest4712	40.77.179.74	US	Boydton, US	36.653400	-78.375000	2026-01-20 07:57:33.057+01	2026-01-20 07:57:33.096+01	2026-01-20 07:57:33.096+01
3ef81660-0fe8-4e1b-b43e-3fdc902be70a	guest4050	123.160.223.73	CN	Unknown, CN	34.773200	113.722000	2026-01-19 11:02:56.496+01	2026-01-19 11:02:56.516+01	2026-01-19 11:02:56.516+01
a8f07a55-cd83-432d-88a2-87985b15c449	guest5006	79.127.221.66	US	WA	47.603400	-122.341400	\N	2026-01-19 11:02:57.614+01	2026-01-19 11:02:57.614+01
f3ab8984-7f49-4a5e-8f5c-de3080cdabf2	guest7594	66.249.73.164	US	\N	37.751000	-97.822000	\N	2026-01-18 12:54:21.845+01	2026-01-18 12:54:21.845+01
e4c69e24-49b2-449e-b293-ca22e498c024	guest9098	157.51.206.214	IN	Chennai, IN	12.899600	80.220900	2026-01-20 08:22:12.506+01	2026-01-20 08:19:34.698+01	2026-01-20 08:22:12.506+01
3a741897-be0d-42c0-bbb2-163a6971cf7c	guest5034	103.105.101.159	IN	Hyderabad, IN	17.372400	78.437800	2026-01-18 13:07:36.487+01	2026-01-18 11:17:58.544+01	2026-01-18 13:07:36.488+01
08456b33-b5c2-41ff-b44d-2c8b428d306d	guest2330	27.59.60.117	IN	Unknown, IN	21.997400	79.001100	2026-01-21 16:18:53.427+01	2026-01-21 16:18:53.373+01	2026-01-21 16:18:53.428+01
c1a2a729-eada-4821-be53-a3dbfa6e0213	guest8677	103.172.203.33	IN	Unknown, IN	21.997400	79.001100	2026-01-18 13:27:59.345+01	2026-01-18 13:24:11.241+01	2026-01-18 13:27:59.345+01
3114df13-613a-4b85-a8f4-5bdfb3c8f57f	guest8018	27.59.61.117	IN	Unknown, IN	21.997400	79.001100	2026-01-21 16:28:45.402+01	2026-01-21 16:28:45.342+01	2026-01-21 16:28:45.402+01
556af4eb-16ee-4dad-a205-2c0b06c8abd9	guest5765	157.15.93.14	\N	\N	\N	\N	2026-01-20 19:01:51.978+01	2026-01-20 19:01:51.218+01	2026-01-20 19:01:51.978+01
2a689c97-d597-4200-a888-4e41cca54bd0	guest7228	40.77.179.159	US	Boydton, US	36.653400	-78.375000	2026-01-20 19:46:11.43+01	2026-01-20 19:46:11.475+01	2026-01-20 19:46:11.475+01
0ff21738-40d3-472b-9b11-c9a394de4263	guest8455	157.51.206.121	IN	Chennai, IN	12.899600	80.220900	2026-01-20 20:37:22.347+01	2026-01-20 20:37:22.392+01	2026-01-20 20:37:22.392+01
e7f34519-14aa-4143-a6a6-66265f81624b	guest3671	149.56.150.26	CA	Montreal, CA	45.507500	-73.588700	2026-01-21 01:46:45.503+01	2026-01-21 01:46:45.511+01	2026-01-21 01:46:45.511+01
405e51cc-d881-45c9-89c6-7392055e9b8a	guest5811	17.246.23.224	US	\N	37.751000	-97.822000	\N	2026-01-22 18:11:57.008+01	2026-01-22 18:11:57.008+01
43f1bce2-764c-4d35-9658-9799503f40ec	guest2551	65.55.210.146	US	Unknown, US	47.603400	-122.341400	2026-01-19 16:33:35.64+01	2026-01-19 16:33:33.712+01	2026-01-19 16:33:35.641+01
cbc2814c-01c4-40f3-922f-6412ade18155	guest7820	40.160.22.169	US	Unknown, US	37.751000	-97.822000	2026-01-21 03:42:57.664+01	2026-01-21 03:42:57.395+01	2026-01-21 03:42:57.664+01
7cbb882b-01f3-4b14-b6ea-f78ffaf747b3	guest7676	103.172.203.76	IN	Unknown, IN	21.997400	79.001100	2026-01-21 19:24:13.809+01	2026-01-21 19:23:10.981+01	2026-01-21 19:24:13.809+01
2ebbf445-b179-4698-9bd2-24d2b5edf8c4	guest5301	180.153.236.111	CN	Unknown, CN	34.773200	113.722000	2026-01-19 22:43:26.541+01	2026-01-19 22:43:26.56+01	2026-01-19 22:43:26.56+01
30a28fe4-cb78-45a7-b439-1c6142880ace	guest9976	180.153.236.176	CN	\N	34.773200	113.722000	\N	2026-01-19 22:43:26.621+01	2026-01-19 22:43:26.621+01
3afedadb-c666-4369-ba31-fafbf8c61d18	guest8425	103.105.101.10	IN	Hyderabad, IN	17.372400	78.437800	2026-01-21 19:28:49.45+01	2026-01-21 19:28:49.473+01	2026-01-21 19:28:49.473+01
c0ca94c0-0e31-4a4e-968b-240eab9fa481	guest9956	194.127.167.118	EE	Tallinn, EE	59.438100	24.736900	2026-01-21 03:49:53.725+01	2026-01-21 03:49:50.021+01	2026-01-21 03:49:53.725+01
dc7e996c-288b-4bee-a813-24af3e50b6a3	guest3478	194.127.167.100	EE	Tallinn, EE	59.438100	24.736900	2026-01-21 03:51:07.772+01	2026-01-21 03:51:07.777+01	2026-01-21 03:51:07.777+01
0c496428-355f-4b1f-a1fe-7d0bc931e09d	guest6264	180.153.236.143	CN	Unknown, CN	34.773200	113.722000	2026-01-22 23:19:48.828+01	2026-01-22 23:19:48.872+01	2026-01-22 23:19:48.872+01
f032463f-26c3-40db-aa32-558a43e44ab4	guest1114	103.105.101.130	IN	Hyderabad, IN	17.372400	78.437800	2026-01-21 04:46:29.771+01	2026-01-18 14:29:01.1+01	2026-01-21 04:46:29.771+01
33e713c2-a658-4351-99f3-48f1ce0cc5b1	guest8601	103.31.178.164	BD	Pābna, BD	24.006300	89.241400	2026-01-21 08:20:44.871+01	2026-01-18 11:32:39.308+01	2026-01-21 08:20:44.872+01
3ae53143-85fe-4477-bd7a-959dd6ecd9e7	guest1204	85.254.40.80	US	Los Angeles, US	34.054400	-118.244100	2026-01-23 01:25:44.264+01	2026-01-23 01:25:44.008+01	2026-01-23 01:25:44.264+01
22502795-1d8f-43a7-9c9c-630e4b065231	guest1140	103.172.203.102	IN	Unknown, IN	21.997400	79.001100	2026-01-21 20:06:02.033+01	2026-01-21 19:43:26.882+01	2026-01-21 20:06:02.033+01
8f6d27a7-5563-4ef4-88f7-23cb65169684	guest1475	15.204.105.208	US	Hillsboro, US	45.539700	-122.963800	2026-01-21 08:24:45.409+01	2026-01-21 08:22:38.683+01	2026-01-21 08:24:45.409+01
2079af1a-04bc-4412-856a-58f985ef1fe6	guest5631	115.114.104.220	IN	Hyderabad, IN	17.372400	78.437800	2026-01-21 08:49:08.814+01	2026-01-19 10:51:29.058+01	2026-01-21 08:49:08.814+01
b7f04109-9583-4921-afc4-9b05862c29a0	guest3911	103.31.178.165	BD	E	24.006300	89.241400	\N	2026-01-23 12:52:20.092+01	2026-01-23 12:52:20.092+01
2c6968ba-53a0-4680-9007-b1a0b502fac2	guest8543	152.58.216.185	IN	Kochi, IN	9.918500	76.255800	2026-01-21 21:22:51.219+01	2026-01-21 21:21:15.619+01	2026-01-21 21:22:51.219+01
7b43e93d-c260-4768-9dca-4f912e1b190b	guest1415	205.169.39.2	US	Engelhard, US	35.511800	-76.033100	2026-01-21 22:16:08.222+01	2026-01-21 22:16:07.922+01	2026-01-21 22:16:08.222+01
a58b0a6e-f470-4e30-bd4b-ad6158ba3a8e	guest6271	205.169.39.20	US	Engelhard, US	35.511800	-76.033100	2026-01-21 22:34:53.919+01	2026-01-21 22:34:53.402+01	2026-01-21 22:34:53.919+01
be38f968-34f9-45ef-a312-8b6d92920a3f	guest4155	103.57.225.243	PK	Rawalpindi, PK	33.605400	73.035400	2026-01-21 23:25:07.287+01	2026-01-21 23:25:07.299+01	2026-01-21 23:25:07.299+01
df40a68a-7cdd-4a33-9287-d487c93ebda2	guest5135	17.22.237.160	US	\N	37.751000	-97.822000	\N	2026-01-22 01:30:45.946+01	2026-01-22 01:30:45.946+01
415a36f3-3d88-405a-9b20-9bb0baa22446	guest3760	103.172.203.59	IN	Unknown, IN	21.997400	79.001100	2026-01-23 17:55:07.947+01	2026-01-22 05:15:23.215+01	2026-01-23 17:55:07.947+01
522d29cf-f7d4-439e-95e4-64fff8b1abcc	guest8315	106.192.43.137	IN	Delhi, IN	28.654200	77.237300	2026-01-23 18:28:48.689+01	2026-01-23 17:55:21.843+01	2026-01-23 18:28:48.69+01
\.


--
-- TOC entry 3695 (class 0 OID 21085)
-- Dependencies: 291
-- Data for Name: PlantImages; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantImages" (id, plant_id, image_url, is_primary, caption) FROM stdin;
\.


--
-- TOC entry 3698 (class 0 OID 21112)
-- Dependencies: 294
-- Data for Name: PlantTag_Map; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantTag_Map" (plant_id, tag_id) FROM stdin;
\.


--
-- TOC entry 3697 (class 0 OID 21102)
-- Dependencies: 293
-- Data for Name: PlantTags; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantTags" (id, tag_name) FROM stdin;
\.


--
-- TOC entry 3691 (class 0 OID 20041)
-- Dependencies: 287
-- Data for Name: SpeciesDictionary; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."SpeciesDictionary" (fish_id, common_name, scientific_name, family, origin, description, min_temp, max_temp, min_ph, max_ph, min_hardness, max_hardness, water_type, diet_type, diet_info, max_size_cm, min_tank_size_liters, care_level, temperament, compatibility_notes, primary_image, gallery_images, breeding_difficulty, breeding_notes, views_count, created_by, status, created_at, updated_at) FROM stdin;
03656d10-3c46-413c-8b0d-5f433f28f215	Siamese Fighting Fish / Betta	Betta splendens	Osphronemidae	Southeast Asia (Thailand, Cambodia, Vietnam)	The Betta splendens is world-renowned for its vibrant colors and dramatic, flowing fins (though females and wild types have shorter fins). They possess a unique "labyrinth organ," which allows them to breathe atmospheric air from the water's surface. This adaptation helps them survive in low-oxygen environments like rice paddies and stagnant ponds. They are highly intelligent for fish and can often recognize their owners.	24.0	28.0	6.0	7.5	5	15	freshwater	carnivore	Bettas are specialized insectivores in the wild. In a home aquarium, they should be fed high-protein pellets or flakes specifically formulated for Bettas. For optimal health, supplement their diet with live or frozen foods such as:\n\nBloodworms\n\nBrine shrimp\n\nDaphnia (helpful for digestion)	7.00	19	easy	territorial	\N	https://splashyfishstore.com/cdn/shop/articles/Betta_9_1.jpg?v=1747907538	\N	moderate	Bettas are bubble nest builders. The male blows a nest of bubbles at the surface to house the eggs. Breeding requires a separate tank with shallow water and no internal filter flow that might disturb the nest.\n\nCrucial Note: The male must be separated from the female immediately after spawning to prevent him from killing her, and the male himself should be removed once the fry are free-swimming.	9	57daae93-1144-43f2-9081-30858f3c95f7	published	2026-01-09 15:05:43.832+01	2026-01-20 07:00:44.163+01
\.


--
-- TOC entry 3683 (class 0 OID 19767)
-- Dependencies: 279
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Users" (id, userid, name, dob, gender, email, password, role, status, failed_login_attempts, last_seen, community_rating, "createdAt", "updatedAt", ip_address, country_code, region, latitude, longitude) FROM stdin;
1a17ca08-5fdd-4ba2-96cb-6593dd806d05	kaustav2003	kaustav	2003-08-19	male	kaustavmahata@gmail.com	$2b$10$oWDcYIG9Ai8nq74S5wmca.VIKli4.dTQDRPQD.UuR0QlqjqUd26qy	admin	active	0	2026-01-10 11:43:17.255+01	0	2026-01-10 11:43:17.259+01	2026-01-11 10:10:18.428+01	103.151.156.24	IN	WB	22.518000	88.383200
75eb0524-6d2c-42e4-aea1-d74839d1e1ea	testinguser	testing user	1986-05-08	male	testing@mail.com	$2b$10$E78kzWGrllneuTEMvVGDk.P0qKJw4on4F4.JnF9G2/r24ITtpUNBS	user	active	0	2026-01-18 12:54:22.055+01	0	2026-01-17 06:14:35.651+01	2026-01-20 02:40:50.042+01	103.105.101.159	IN	Hyderabad, IN	17.372400	78.437800
b97ee8f3-1b36-4648-b159-5f6dbda54040	khairul_aqua	Khairul Islam	2001-04-02	male	khairul.freelance3@gmail.com	$2b$10$Lqm5myFzNxDtHa6WV2n/vuHBw4zgVLWeGnmi80l.XFi73QzgJRHxa	admin	active	0	2026-01-21 09:02:21.822+01	0	2026-01-13 11:07:25.763+01	2026-01-21 09:02:21.822+01	157.51.214.57	IN	Chennai, IN	12.899600	80.220900
3913f1a8-d470-4edb-af10-bdc26f59b1a9	test3	test3	1986-05-08	female	test3@mail.com	$2b$10$cloj4sk2MG4JKLebHyd5DOlM7lw6QGCac.1sa/NCp5KHojGMszVk6	user	active	0	2026-01-17 16:24:47.912+01	0	2026-01-17 16:24:47.915+01	2026-01-17 16:24:47.915+01	103.172.203.134	IN	\N	21.997400	79.001100
57daae93-1144-43f2-9081-30858f3c95f7	nikhileshreddy	Nikhilesh Reddy	1986-08-05	male	nikhileshreddybhavanam@rediffmail.com	$2b$10$yTx.kZn3HtA38ocmHNMN4eZATOSNXLkrlWrdtcBGiZUJmLebOuvLu	admin	active	0	2026-01-23 17:48:19.233+01	0	2026-01-04 09:59:09.954+01	2026-01-23 17:48:19.234+01	103.172.203.59	IN	\N	21.997400	79.001100
eb18a68b-b706-488b-8a8c-ebfaa4356c76	test4	test user 4	1986-05-08	female	test4@mail.com	$2b$10$fExnt6OsN7joNjqieaGbM.hPH0xXHCmkLlhM19BVw8yUnHsgAtBGy	user	active	0	2026-01-18 12:30:20.137+01	0	2026-01-17 16:38:52.669+01	2026-01-18 12:30:20.137+01	103.105.101.159	IN	TG	17.372400	78.437800
\.


--
-- TOC entry 3687 (class 0 OID 19887)
-- Dependencies: 283
-- Data for Name: VideoGuides; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."VideoGuides" (id, title, "youtubeLink", "channelAvatarUrl", description, "videoId", duration, "viewCount", category, "isActive", status, "submittedBy", "createdAt", "updatedAt") FROM stdin;
5c8895cd-0565-4815-a309-5945999025b7	Cloudy Water in the Aquarium	https://www.youtube.com/watch?v=2oFRZZ8JHuA	https://yt3.ggpht.com/5xhUCKlpSOUVHzIi1iSL8ld4w6bABoy0reTkF6Whn8ePgFdOINxAKdUeTR_JeiGrHx6Iiu0ZnA=s88-c-k-c0x00ffffff-no-rj	🌱 Visit https://aquariumcoop.com/ to buy aquarium plants, lights, fish food, and more from Aquarium Co-Op\n🐟 Buy fish at https://geni.us/LiveFish from our preferred online retailers with the code aquariumcoop to save 5%\n‎ Not sure why your fish tank has cloudy water? Zenzo walks us through several common reasons why your aquarium looks murky and how to easily fix the problem.\n▶ Magnetic algae scrapper (for glass tanks): https://www.aquariumcoop.com/products/mag-float-cleaners\n▶ Water clarifier: https://www.aquariumcoop.com/products/fritz-clarifier-16oz\n🥇 Become a member to get access to perks: https://www.youtube.com/channel/UCNJuJfXCKNWu4-VifYixs8A/join\n📅 Member Events Calendar: https://www.aquariumcoop.com/pages/events\n🔔 Never miss a video or live stream again. Sign up for text messages. https://www.aquariumcoop.com/pages/youtubenotifications\n🌱 Buy plants, lights, food, chemicals and more from our online store: https://aquariumcoop.com/\n📕 Want in-depth articles on freshwater aquariums? Visit our blog: https://aquariumcoop.com/blogs/aquarium\n💬 Searching for that respectful community to talk about fish? Join our forum: https://forum.aquariumcoop.com/\n\nWHO WE ARE\n------------------------------------------------\nAt Aquarium Co-Op, we focus on your aquariums. We specialize in freshwater tropical fish, aquatic plants, and the overall betterment of the freshwater fish keeping hobby. Our goal is to help you with your first pet fish and graduate you to an advanced aquarium hobbyist. If you'd like to take it to the next level, subscribe to Aquarium Co-Op and check out our weekly videos. \n\nCory McElroy is employed by Aquarium Co-Op LLC. He also owns Aquarium Co-Op LLC. Therefore, all content is sponsored by Aquarium Co-Op.\n\n#Aquariumcoop #Aquariumfish #Fishtank	2oFRZZ8JHuA	\N	0	Maintainance	t	approved	57daae93-1144-43f2-9081-30858f3c95f7	2026-01-11 10:23:44.661+01	2026-01-17 12:10:23.603+01
c319cbb2-c50b-46ad-af6a-239dd4fd3c12	Filter Upgrade	https://www.youtube.com/watch?v=WpuhF-xhPFY	https://yt3.ggpht.com/ytc/AIdro_lgmp6zF0QMQIZifSxfBUijSj13SR6XlXqRcsno5-MpnZ4=s88-c-k-c0x00ffffff-no-rj	This is probably the most silent external canister filter I've ever owned!\n\nLink to the filter https://amzn.to/4sAj7lX\n\nEverything I've used to create this aquascape (affiliate links)\nTANK\nEU: https://bit.ly/3Ijfoqy\nUS: https://bit.ly/47QAGWU (Similar)\nCABINET\nEU: https://bit.ly/4nHE0by\nUS: https://bit.ly/47W1hlv  (Similar) \nLIGHT\nUS: https://bit.ly/429nqJH\nEU: https://bit.ly/43KilZx\nFILTER\nEU: https://amzn.to/3IvcIWL\nUS: https://amzn.to/3Kc5Myg\nINFLOW & OUTFLOW\nEU: https://bit.ly/3K9DJj4\nUS: https://bit.ly/3Iul4hj\nAQUASOIL\nEU: https://bit.ly/3QupYNa\nUS: https://bit.ly/3qoaoI0\nSAND\nEU: https://bit.ly/3v9YhgG\nUS: https://bit.ly/46cF5SQ\nWOOD\nEU: https://bit.ly/4aOce7R\nUS: https://bit.ly/41TAL7b\nROCKS\nEU: https://bit.ly/4ebipEA\nUS: https://bit.ly/3OJprFH\nGLASS BACKGROUND FOIL\nUS: https://amzn.to/3NKopcC\nEU: https://amzn.to/41d4HJg\nBACTER 100\nhttps://bit.ly/3utbrZ9\nTOURMALINE BC\nhttps://bit.ly/3RelQAE\nCLEAR SUPER\nhttps://bit.ly/3sNDUbo\nSuper glue Liquid\nEU: https://bit.ly/3rC0rY3\nUS: https://amzn.to/408UAqi\nSuper glue Gel\nEU: https://amzn.to/46B3L52\nUS: https://amzn.to/3J2owwM\n\n🚨Watch this next!🚨\nInspiration playlist! https://youtube.com/playlist?list=PLrlvf56gZy-ipL3105SdfKsUBrMUSttoh\nCO2 buying guide! https://youtu.be/dIVrr1yS3sU\nHow to SETUP your CO2! https://youtu.be/qSHZ4F2PI2o\nSimple fertilizer dosing! https://youtu.be/I_KBOUM1RXM\n\n👉🏻10% DISCOUNT on CO2Art with code: Amsterdam\n\n👉🏻Be sure to SUBSCRIBE to my YouTube channel: YouTube.com/mjaquascaping\n\n#plantedtank #aquascape #mjaquascaping	WpuhF-xhPFY	\N	0		t	rejected	75eb0524-6d2c-42e4-aea1-d74839d1e1ea	2026-01-17 09:04:03.21+01	2026-01-17 09:58:07.81+01
\.


--
-- TOC entry 3689 (class 0 OID 19949)
-- Dependencies: 285
-- Data for Name: text_authors; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.text_authors ("createdAt", "updatedAt", user_id, text_id) FROM stdin;
\.


--
-- TOC entry 3688 (class 0 OID 19923)
-- Dependencies: 284
-- Data for Name: textguides; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.textguides (id, title, content, created_at, updated_at, status, author, rejection_justification, rejection_requested_by, rejection_status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 288
-- Name: aquaticplants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public.aquaticplants_id_seq', 1, false);


--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 290
-- Name: plantimages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public.plantimages_id_seq', 1, false);


--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 292
-- Name: planttags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public.planttags_id_seq', 1, false);


--
-- TOC entry 3498 (class 2606 OID 21597)
-- Name: AquaticPlants AquaticPlants_scientific_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key" UNIQUE (scientific_name);


--
-- TOC entry 3500 (class 2606 OID 21599)
-- Name: AquaticPlants AquaticPlants_scientific_name_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key1" UNIQUE (scientific_name);


--
-- TOC entry 3502 (class 2606 OID 21593)
-- Name: AquaticPlants AquaticPlants_scientific_name_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key2" UNIQUE (scientific_name);


--
-- TOC entry 3465 (class 2606 OID 19849)
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- TOC entry 3467 (class 2606 OID 19873)
-- Name: CommunityChats CommunityChats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityChats"
    ADD CONSTRAINT "CommunityChats_pkey" PRIMARY KEY (id);


--
-- TOC entry 3463 (class 2606 OID 19828)
-- Name: CommunityForums CommunityForums_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_pkey" PRIMARY KEY (id);


--
-- TOC entry 3518 (class 2606 OID 21743)
-- Name: FAQs FAQs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_pkey" PRIMARY KEY (id);


--
-- TOC entry 3520 (class 2606 OID 21745)
-- Name: FAQs FAQs_question_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key" UNIQUE (question);


--
-- TOC entry 3522 (class 2606 OID 21761)
-- Name: GuestConversions GuestConversions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."GuestConversions"
    ADD CONSTRAINT "GuestConversions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 21560)
-- Name: Guests Guests_guest_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key" UNIQUE (guest_name);


--
-- TOC entry 3477 (class 2606 OID 21564)
-- Name: Guests Guests_guest_name_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key1" UNIQUE (guest_name);


--
-- TOC entry 3479 (class 2606 OID 21558)
-- Name: Guests Guests_guest_name_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key2" UNIQUE (guest_name);


--
-- TOC entry 3481 (class 2606 OID 21571)
-- Name: Guests Guests_ip_address_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key" UNIQUE (ip_address);


--
-- TOC entry 3483 (class 2606 OID 21575)
-- Name: Guests Guests_ip_address_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key1" UNIQUE (ip_address);


--
-- TOC entry 3485 (class 2606 OID 21569)
-- Name: Guests Guests_ip_address_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key2" UNIQUE (ip_address);


--
-- TOC entry 3487 (class 2606 OID 21573)
-- Name: Guests Guests_ip_unique; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_unique" UNIQUE (ip_address);


--
-- TOC entry 3489 (class 2606 OID 21562)
-- Name: Guests Guests_name_unique; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_name_unique" UNIQUE (guest_name);


--
-- TOC entry 3491 (class 2606 OID 19979)
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- TOC entry 3510 (class 2606 OID 21670)
-- Name: PlantTags PlantTags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key" UNIQUE (tag_name);


--
-- TOC entry 3493 (class 2606 OID 20731)
-- Name: SpeciesDictionary SpeciesDictionary_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."SpeciesDictionary"
    ADD CONSTRAINT "SpeciesDictionary_pkey" PRIMARY KEY (fish_id);


--
-- TOC entry 3439 (class 2606 OID 21497)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 3441 (class 2606 OID 21493)
-- Name: Users Users_email_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);


--
-- TOC entry 3443 (class 2606 OID 21499)
-- Name: Users Users_email_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);


--
-- TOC entry 3445 (class 2606 OID 21491)
-- Name: Users Users_email_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);


--
-- TOC entry 3447 (class 2606 OID 21495)
-- Name: Users Users_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_unique" UNIQUE (email);


--
-- TOC entry 3449 (class 2606 OID 20729)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3451 (class 2606 OID 21480)
-- Name: Users Users_userid_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_key" UNIQUE (userid);


--
-- TOC entry 3453 (class 2606 OID 21476)
-- Name: Users Users_userid_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_key1" UNIQUE (userid);


--
-- TOC entry 3455 (class 2606 OID 21482)
-- Name: Users Users_userid_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_key2" UNIQUE (userid);


--
-- TOC entry 3457 (class 2606 OID 21474)
-- Name: Users Users_userid_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_key3" UNIQUE (userid);


--
-- TOC entry 3459 (class 2606 OID 21478)
-- Name: Users Users_userid_unique; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_unique" UNIQUE (userid);


--
-- TOC entry 3469 (class 2606 OID 19902)
-- Name: VideoGuides VideoGuides_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."VideoGuides"
    ADD CONSTRAINT "VideoGuides_pkey" PRIMARY KEY (id);


--
-- TOC entry 3504 (class 2606 OID 21081)
-- Name: AquaticPlants aquaticplants_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT aquaticplants_pkey PRIMARY KEY (id);


--
-- TOC entry 3506 (class 2606 OID 21595)
-- Name: AquaticPlants aquaticplants_scientific_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT aquaticplants_scientific_name_key UNIQUE (scientific_name);


--
-- TOC entry 3508 (class 2606 OID 21095)
-- Name: PlantImages plantimages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages"
    ADD CONSTRAINT plantimages_pkey PRIMARY KEY (id);


--
-- TOC entry 3516 (class 2606 OID 21118)
-- Name: PlantTag_Map planttag_map_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT planttag_map_pkey PRIMARY KEY (plant_id, tag_id);


--
-- TOC entry 3512 (class 2606 OID 21109)
-- Name: PlantTags planttags_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT planttags_pkey PRIMARY KEY (id);


--
-- TOC entry 3514 (class 2606 OID 21668)
-- Name: PlantTags planttags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT planttags_tag_name_key UNIQUE (tag_name);


--
-- TOC entry 3473 (class 2606 OID 20733)
-- Name: text_authors text_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.text_authors
    ADD CONSTRAINT text_authors_pkey PRIMARY KEY (user_id, text_id);


--
-- TOC entry 3471 (class 2606 OID 19938)
-- Name: textguides textguides_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_pkey PRIMARY KEY (id);


--
-- TOC entry 3494 (class 1259 OID 21672)
-- Name: idx_species_common_name; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX idx_species_common_name ON public."SpeciesDictionary" USING btree (common_name);


--
-- TOC entry 3495 (class 1259 OID 20770)
-- Name: idx_species_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX idx_species_id ON public."SpeciesDictionary" USING btree (fish_id);


--
-- TOC entry 3460 (class 1259 OID 21500)
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX idx_users_email ON public."Users" USING btree (email);


--
-- TOC entry 3461 (class 1259 OID 21483)
-- Name: idx_users_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX idx_users_id ON public."Users" USING btree (userid);


--
-- TOC entry 3496 (class 1259 OID 21675)
-- Name: species_dictionary_common_name_scientific_name; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE UNIQUE INDEX species_dictionary_common_name_scientific_name ON public."SpeciesDictionary" USING btree (common_name, scientific_name);


--
-- TOC entry 3525 (class 2606 OID 21548)
-- Name: Comments Comments_forum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_forum_id_fkey" FOREIGN KEY (forum_id) REFERENCES public."CommunityForums"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3526 (class 2606 OID 21543)
-- Name: Comments Comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3527 (class 2606 OID 21579)
-- Name: CommunityChats CommunityChats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityChats"
    ADD CONSTRAINT "CommunityChats_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3523 (class 2606 OID 21518)
-- Name: CommunityForums CommunityForums_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3524 (class 2606 OID 21533)
-- Name: CommunityForums CommunityForums_rejection_requested_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_rejection_requested_by_fkey" FOREIGN KEY (rejection_requested_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3535 (class 2606 OID 21746)
-- Name: FAQs FAQs_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3532 (class 2606 OID 21657)
-- Name: PlantImages PlantImages_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages"
    ADD CONSTRAINT "PlantImages_plant_id_fkey" FOREIGN KEY (plant_id) REFERENCES public."AquaticPlants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3531 (class 2606 OID 21685)
-- Name: SpeciesDictionary SpeciesDictionary_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."SpeciesDictionary"
    ADD CONSTRAINT "SpeciesDictionary_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- TOC entry 3528 (class 2606 OID 21703)
-- Name: VideoGuides VideoGuides_submittedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."VideoGuides"
    ADD CONSTRAINT "VideoGuides_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3533 (class 2606 OID 21119)
-- Name: PlantTag_Map planttag_map_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT planttag_map_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public."AquaticPlants"(id) ON DELETE CASCADE;


--
-- TOC entry 3534 (class 2606 OID 21124)
-- Name: PlantTag_Map planttag_map_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT planttag_map_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public."PlantTags"(id) ON DELETE CASCADE;


--
-- TOC entry 3529 (class 2606 OID 21715)
-- Name: textguides textguides_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_author_fkey FOREIGN KEY (author) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3530 (class 2606 OID 21720)
-- Name: textguides textguides_rejection_requested_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_rejection_requested_by_fkey FOREIGN KEY (rejection_requested_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO admin_aquaguide_db_user;


-- Completed on 2026-01-23 23:00:10 IST

--
-- PostgreSQL database dump complete
--

\unrestrict wUdgcO6Bmlv0d7SGh9s6j6eM5d0RwnjiJnk9bMGpEbytE9ZD7fG1SfpnRReNHxi

