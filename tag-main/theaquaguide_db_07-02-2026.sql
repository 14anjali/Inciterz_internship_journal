--
-- PostgreSQL database dump
--

\restrict zcCglgdopFS7ysxzVQnQH7eBHhLA2QbJQLdtsKz7V6QgHw5cWgbtcU9YHkGM8RM

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg12+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg12+2)

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
-- Name: difficulty_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.difficulty_enum AS ENUM (
    'easy',
    'intermediate',
    'advanced'
);


ALTER TYPE public.difficulty_enum OWNER TO postgres;

--
-- Name: enum_AquaticPlants_difficulty; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_AquaticPlants_difficulty" AS ENUM (
    'easy',
    'intermediate',
    'advanced'
);


ALTER TYPE public."enum_AquaticPlants_difficulty" OWNER TO admin_aquaguide_db_user;

--
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
-- Name: enum_CommunityChat_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityChat_type" AS ENUM (
    'text',
    'image',
    'file'
);


ALTER TYPE public."enum_CommunityChat_type" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_CommunityForums_rejection_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityForums_rejection_status" AS ENUM (
    'pending',
    'approved',
    'denied'
);


ALTER TYPE public."enum_CommunityForums_rejection_status" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_CommunityForums_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityForums_status" AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public."enum_CommunityForums_status" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_CommunityRooms_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityRooms_status" AS ENUM (
    'active',
    'pending',
    'rejected'
);


ALTER TYPE public."enum_CommunityRooms_status" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_CommunityRooms_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_CommunityRooms_type" AS ENUM (
    'public',
    'private'
);


ALTER TYPE public."enum_CommunityRooms_type" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_Conversations_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Conversations_type" AS ENUM (
    'private',
    'group'
);


ALTER TYPE public."enum_Conversations_type" OWNER TO admin_aquaguide_db_user;

--
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
-- Name: enum_SpeciesDictionary_diet_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_diet_type" AS ENUM (
    'herbivore',
    'carnivore',
    'omnivore'
);


ALTER TYPE public."enum_SpeciesDictionary_diet_type" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_SpeciesDictionary_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_status" AS ENUM (
    'draft',
    'published',
    'archived'
);


ALTER TYPE public."enum_SpeciesDictionary_status" OWNER TO admin_aquaguide_db_user;

--
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
-- Name: enum_SpeciesDictionary_water_type; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_SpeciesDictionary_water_type" AS ENUM (
    'freshwater',
    'brackish',
    'marine'
);


ALTER TYPE public."enum_SpeciesDictionary_water_type" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_Users_gender; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_gender" AS ENUM (
    'male',
    'female',
    'rather_not_say'
);


ALTER TYPE public."enum_Users_gender" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'user',
    'admin',
    'support'
);


ALTER TYPE public."enum_Users_role" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_Users_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_Users_status" AS ENUM (
    'active',
    'inactive',
    'locked',
    'pending_deletion'
);


ALTER TYPE public."enum_Users_status" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_VideoGuides_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public."enum_VideoGuides_status" AS ENUM (
    'approved',
    'pending',
    'rejected'
);


ALTER TYPE public."enum_VideoGuides_status" OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_support_chats_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public.enum_support_chats_status AS ENUM (
    'active',
    'resolved'
);


ALTER TYPE public.enum_support_chats_status OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_textguides_rejection_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public.enum_textguides_rejection_status AS ENUM (
    'pending',
    'approved',
    'denied'
);


ALTER TYPE public.enum_textguides_rejection_status OWNER TO admin_aquaguide_db_user;

--
-- Name: enum_textguides_status; Type: TYPE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TYPE public.enum_textguides_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_textguides_status OWNER TO admin_aquaguide_db_user;

--
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
-- Name: AdminLogs; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."AdminLogs" (
    id integer NOT NULL,
    admin_id character varying(255),
    admin_email character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    details jsonb,
    ip_address character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AdminLogs" OWNER TO admin_aquaguide_db_user;

--
-- Name: AdminLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public."AdminLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AdminLogs_id_seq" OWNER TO admin_aquaguide_db_user;

--
-- Name: AdminLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public."AdminLogs_id_seq" OWNED BY public."AdminLogs".id;


--
-- Name: AquaticPlants; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."AquaticPlants" (
    id integer NOT NULL,
    scientific_name character varying(255) NOT NULL,
    common_name character varying(255),
    family character varying(100),
    origin character varying(100),
    placement character varying(32) DEFAULT 'midground'::character varying,
    difficulty character varying(32) DEFAULT 'easy'::character varying,
    growth_rate character varying(32) DEFAULT 'medium'::character varying,
    temp_min_celsius numeric(4,1),
    temp_max_celsius numeric(4,1),
    ph_min numeric(3,1),
    ph_max numeric(3,1),
    gh_min integer,
    gh_max integer,
    lighting character varying(32) DEFAULT 'medium'::character varying,
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
-- Name: AquaticPlants_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public."AquaticPlants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AquaticPlants_id_seq" OWNER TO admin_aquaguide_db_user;

--
-- Name: AquaticPlants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public."AquaticPlants_id_seq" OWNED BY public."AquaticPlants".id;


--
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
-- Name: ConversationParticipants; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."ConversationParticipants" (
    id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public."ConversationParticipants" OWNER TO admin_aquaguide_db_user;

--
-- Name: Conversations; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."Conversations" (
    id uuid NOT NULL,
    type public."enum_Conversations_type" DEFAULT 'private'::public."enum_Conversations_type" NOT NULL,
    last_message_at timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Conversations" OWNER TO admin_aquaguide_db_user;

--
-- Name: FAQs; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."FAQs" (
    id uuid NOT NULL,
    question character varying(255) NOT NULL,
    answers text NOT NULL,
    created_by uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FAQs" OWNER TO admin_aquaguide_db_user;

--
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
-- Name: PersonalMessages; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PersonalMessages" (
    id uuid NOT NULL,
    conversation_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    message text NOT NULL,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."PersonalMessages" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantImages; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantImages" (
    id integer NOT NULL,
    plant_id integer,
    image_url text NOT NULL,
    is_primary boolean DEFAULT false,
    caption character varying(255)
);


ALTER TABLE public."PlantImages" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantImages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public."PlantImages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PlantImages_id_seq" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantImages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public."PlantImages_id_seq" OWNED BY public."PlantImages".id;


--
-- Name: PlantTag_Map; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantTag_Map" (
    plant_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public."PlantTag_Map" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantTags; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public."PlantTags" (
    id integer NOT NULL,
    tag_name character varying(50) NOT NULL
);


ALTER TABLE public."PlantTags" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantTags_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE SEQUENCE public."PlantTags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PlantTags_id_seq" OWNER TO admin_aquaguide_db_user;

--
-- Name: PlantTags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER SEQUENCE public."PlantTags_id_seq" OWNED BY public."PlantTags".id;


--
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
    ip_address character varying(255),
    country_code character varying(2),
    region character varying(255),
    latitude numeric(9,6),
    longitude numeric(9,6),
    "resetPasswordToken" character varying(255),
    "resetPasswordExpires" timestamp with time zone,
    "deletionRequestedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO admin_aquaguide_db_user;

--
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
-- Name: communities; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.communities (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    is_private boolean NOT NULL,
    created_by uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.communities OWNER TO admin_aquaguide_db_user;

--
-- Name: community_members; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.community_members (
    id uuid NOT NULL,
    community_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.community_members OWNER TO admin_aquaguide_db_user;

--
-- Name: community_messages; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.community_messages (
    id uuid NOT NULL,
    community_id uuid NOT NULL,
    user_id uuid,
    message text NOT NULL,
    edited_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.community_messages OWNER TO admin_aquaguide_db_user;

--
-- Name: support_chat_messages; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.support_chat_messages (
    id uuid NOT NULL,
    support_chat_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    message text NOT NULL,
    datestamp timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.support_chat_messages OWNER TO admin_aquaguide_db_user;

--
-- Name: support_chats; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.support_chats (
    id uuid NOT NULL,
    description text NOT NULL,
    is_accepted boolean DEFAULT false,
    status public.enum_support_chats_status DEFAULT 'active'::public.enum_support_chats_status,
    initiated_by uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.support_chats OWNER TO admin_aquaguide_db_user;

--
-- Name: support_members; Type: TABLE; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE TABLE public.support_members (
    id uuid NOT NULL,
    support_chat_id uuid NOT NULL,
    user_id uuid,
    is_locked boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.support_members OWNER TO admin_aquaguide_db_user;

--
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
-- Name: AdminLogs id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AdminLogs" ALTER COLUMN id SET DEFAULT nextval('public."AdminLogs_id_seq"'::regclass);


--
-- Name: AquaticPlants id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants" ALTER COLUMN id SET DEFAULT nextval('public."AquaticPlants_id_seq"'::regclass);


--
-- Name: PlantImages id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages" ALTER COLUMN id SET DEFAULT nextval('public."PlantImages_id_seq"'::regclass);


--
-- Name: PlantTags id; Type: DEFAULT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags" ALTER COLUMN id SET DEFAULT nextval('public."PlantTags_id_seq"'::regclass);


--
-- Data for Name: AdminLogs; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."AdminLogs" (id, admin_id, admin_email, action, status, details, ip_address, "createdAt", "updatedAt") FROM stdin;
1	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-01 21:04:08.631+01	2026-02-01 21:04:08.631+01
2	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-01 21:15:26.872+01	2026-02-01 21:15:26.872+01
3	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-01 21:24:18.816+01	2026-02-01 21:24:18.816+01
4	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-02 18:17:54.861+01	2026-02-02 18:17:54.861+01
5	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-02 18:19:13.682+01	2026-02-02 18:19:13.682+01
6	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	::ffff:127.0.0.1	2026-02-02 18:26:01.925+01	2026-02-02 18:26:01.925+01
7	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	2401:4900:937f:d76c:7c7d:f16e:a90e:3c89	2026-02-02 18:27:21.885+01	2026-02-02 18:27:21.885+01
8	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	2401:4900:937f:d76c:7c7d:f16e:a90e:3c89	2026-02-02 18:35:24.429+01	2026-02-02 18:35:24.429+01
9	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	2405:201:c030:e158:5c6a:baaa:f533:945e	2026-02-03 06:24:14.686+01	2026-02-03 06:24:14.686+01
10	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	2401:4900:935d:cd91:17b:fecd:9d48:e50b	2026-02-03 15:30:55.104+01	2026-02-03 15:30:55.104+01
11	b2082e43-85cb-4a9d-aec5-c8c89ee7a20b	nikhileshreddybhavanam@rediffmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	115.114.104.219	2026-02-05 15:56:58.232+01	2026-02-05 15:56:58.232+01
12	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	103.172.203.5	2026-02-07 09:50:58.504+01	2026-02-07 09:50:58.504+01
13	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	103.172.203.5	2026-02-07 11:39:47.291+01	2026-02-07 11:39:47.291+01
14	6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul.freelance3@gmail.com	PURGE_CACHE	SUCCESS	{"errors": [], "result": {"id": "597d738b1500c2751e6da101027aa891"}, "success": true, "messages": []}	103.172.203.5	2026-02-07 14:46:37.517+01	2026-02-07 14:46:37.517+01
\.


--
-- Data for Name: AquaticPlants; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."AquaticPlants" (id, scientific_name, common_name, family, origin, placement, difficulty, growth_rate, temp_min_celsius, temp_max_celsius, ph_min, ph_max, gh_min, gh_max, lighting, co2_required, propogation_method, max_height_cm, is_true_aquatic, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Comments" (id, content, user_id, forum_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: CommunityForums; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."CommunityForums" (id, title, content, creator_id, likes, dislike, is_private, status, rejection_justification, rejection_requested_by, rejection_status, image_url, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ConversationParticipants; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."ConversationParticipants" (id, conversation_id, user_id) FROM stdin;
2197a705-bf29-4849-a1eb-8318c0f06ed6	f3a174b6-2a43-42ce-b23f-fdf5968e3d16	6a08c1c8-a356-40f4-ac09-0e058187ecb9
29eaf791-db64-4897-a545-85b1141b9ef9	f3a174b6-2a43-42ce-b23f-fdf5968e3d16	77724a80-b9a8-4602-a0a8-b23d58441cb2
\.


--
-- Data for Name: Conversations; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Conversations" (id, type, last_message_at, "createdAt", "updatedAt") FROM stdin;
f3a174b6-2a43-42ce-b23f-fdf5968e3d16	private	2026-02-07 14:51:36.777+01	2026-02-07 14:51:36.777+01	2026-02-07 14:51:36.777+01
\.


--
-- Data for Name: FAQs; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."FAQs" (id, question, answers, created_by, "createdAt", "updatedAt") FROM stdin;
8cdaa302-4fec-4094-887d-c52c486c66d5	How to fix the Cloud Water issue in an Aquarium?	At theaquaguide.com, we understand that coming home to a cloudy aquarium can be frustrating for both newcomers and seasoned experts. Identifying the specific type of cloudiness is the first step toward restoring your tank's crystal-clear beauty.\n\nBelow is a comprehensive guide to diagnosing and fixing the most common "cloudy water" issues.\n\n1. Milky or Hazy Water (Bacterial Bloom)\n\nIf your tank looks like someone poured a spoonful of milk into it, you are likely experiencing a bacterial bloom. This is common in new tanks (often called "New Tank Syndrome") as the nitrogen cycle stabilizes, but it can also happen in established tanks if the beneficial bacteria population is disturbed.\n\n• How to fix it:\n\n    ◦ Be Patient: In many cases, the best solution is to do nothing and wait 3 to 7 days; the bloom will often resolve itself as the ecosystem balances.\n\n    ◦ Avoid Over-cleaning: Do not scrub the filter or perform massive water changes during a bloom, as this can kill off the very bacteria needed to clear the water.\n\n    ◦ Boost Oxygenation: Bacteria consume oxygen; if you see fish gasping at the surface, increase aeration using an air pump.\n\n    ◦ Add Beneficial Bacteria: Using supplements like Tetra SafeStart or Seachem Stability can help establish the filter more rapidly.\n\n    ◦ UV Sterilization: For a faster fix, a UV sterilizer can destroy suspended bacteria in about 5 to 7 days.\n\n2. Green Water (Algae Bloom)\n\nGreen water is caused by millions of tiny, free-floating algae cells triggered by excess light or nutrients.\n\n• How to fix it:\n\n    ◦ Control Lighting: Ensure the tank is out of direct sunlight and limit artificial light to 8–10 hours per day.\n\n    ◦ Blackout Method: Wrap the tank in a blanket for 3 to 10 days to completely block light, killing the algae (though monitor your plants, as they may suffer).\n\n    ◦ UV Sterilizer: This is often considered the most effective long-term solution, as UV-C rays destroy the algae's DNA and prevent reproduction.\n\n    ◦ Add Live Plants: Rapidly growing plants like hornwort or floating species will outcompete algae for nutrients.\n\n3. Particles and Debris (Gray/Brown Tint)\n\nIf you see visible specks or a "dusty" appearance, it is usually mechanical debris from the substrate or organic waste.\n\n• How to fix it:\n\n    ◦ Rinse Your Substrate: If the tank is new, the gravel or sand may need more thorough rinsing to remove dust.\n\n    ◦ Improve Filtration: Add fine filter floss or poly-pads to your filter to trap tiny particles that standard sponges miss.\n\n    ◦ Vacuum the Substrate: Use a gravel siphon to remove trapped fish waste and uneaten food.\n\n    ◦ Clean the Filter Correctly: Only rinse filter media in old aquarium water—never tap water—to prevent killing beneficial bacteria with chlorine.\n\n    ◦ Water Clarifiers: Products like Seachem Clarity clump tiny particles together so the filter can catch them more easily.\n\n4. Brown or Yellow Water (Tannins)\n\nTransparent but tea-colored water is usually caused by tannins leaching from driftwood or decaying plant matter.\n\n• How to fix it:\n   \n    ◦ Pre-soak Driftwood: Boil or soak new wood for several days before adding it to the tank.\n   \n    ◦ Chemical Filtration: Add activated carbon or Seachem Purigen to your filter to chemically absorb the color.\n\nEssential Prevention Tips for the Community\n\nTo keep your water clear long-term, our experts recommend these daily habits:\n\n• Stop Overfeeding: Only feed what your fish can consume in 2 to 3 minutes; excess food is a primary cause of ammonia spikes and blooms.\n\n• Test Your Water: Regularly check for ammonia, nitrite, and nitrate. Any ammonia level above zero is a problem.\n\n• Dechlorinate Everything: Always use a water conditioner like Seachem Prime or Tetra AquaSafe when adding tap water to neutralize harmful chlorine and chloramines.\n\n• Maintain Proper Stocking: An overstocked tank produces more waste than a filter can typically handle, leading to chronic cloudiness.	6a08c1c8-a356-40f4-ac09-0e058187ecb9	2026-02-03 15:09:51.852+01	2026-02-03 15:09:51.852+01
e807d8c1-e62b-4018-a347-a2d8c1c966dd	Testinmg the FAQ	Testing the FAQ	6a08c1c8-a356-40f4-ac09-0e058187ecb9	2026-02-07 14:44:37.662+01	2026-02-07 14:44:37.662+01
\.


--
-- Data for Name: GuestConversions; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."GuestConversions" (id, guest_id, user_id, converted_at, "createdAt", "updatedAt") FROM stdin;
e2f85c2e-0af0-4a64-8f63-be45f3e4a6f6	1822f420-06b9-42d0-9321-cfc1fa1bafa2	6a08c1c8-a356-40f4-ac09-0e058187ecb9	2026-01-31 13:33:30.368+01	2026-01-31 13:33:30.368+01	2026-01-31 13:33:30.368+01
9d767760-5a90-42b8-8d02-a7e380439f8d	adfa30fb-9d3f-4399-b6eb-090e67d63b10	a00546c6-1cf7-4592-a807-60449485babd	2026-01-31 13:37:04.059+01	2026-01-31 13:37:04.06+01	2026-01-31 13:37:04.06+01
28bfc0a6-2012-4a63-b7e6-d30bc9dd677b	86321981-b3ab-4a2e-80f8-3c5d0a5cb70b	9d08bd60-546b-4bfd-b6b3-0af7ea40bd5e	2026-01-31 13:51:15.665+01	2026-01-31 13:51:15.665+01	2026-01-31 13:51:15.665+01
6a0351c3-b543-468b-9f1c-0b27e07a4ac3	0d2bc4d0-b26f-43e2-9330-436c8006a4fb	83ce69fa-6a61-4e7f-a385-54b15784a227	2026-01-31 13:56:35.549+01	2026-01-31 13:56:35.549+01	2026-01-31 13:56:35.549+01
851ed9e5-db8e-41e7-863f-1c10391fe333	b905a22b-e87b-4632-ae3a-0313cd583e04	fde2e2df-8cb5-4752-9ec4-94b8f1f38831	2026-01-31 14:14:48.572+01	2026-01-31 14:14:48.573+01	2026-01-31 14:14:48.573+01
7e8f3f91-b0e7-440e-8c2a-88935ab715e3	2176d424-a8ec-45bc-a765-70a1b12832a6	b580293c-a0e3-4551-baf4-7bb7c2fc7fc2	2026-02-01 21:30:02.062+01	2026-02-01 21:30:02.062+01	2026-02-01 21:30:02.062+01
73f27f82-37e5-47a9-9db6-8dbb9011556e	d9509171-3b7a-4478-a4f2-0ae1b967b753	c7cc2445-1e65-4b4a-b911-217b2007e1c7	2026-02-03 04:46:13.38+01	2026-02-03 04:46:13.381+01	2026-02-03 04:46:13.381+01
61354645-34ab-483c-9e22-a12252752f6c	d4972c67-df0a-4041-b1e4-72701d526039	b2082e43-85cb-4a9d-aec5-c8c89ee7a20b	2026-02-03 05:28:34.168+01	2026-02-03 05:28:34.168+01	2026-02-03 05:28:34.168+01
ad45602c-6132-49ea-a423-ba6ab76dafe0	de1afb8b-1d96-4a92-8df9-5ca757c3a210	77724a80-b9a8-4602-a0a8-b23d58441cb2	2026-02-07 07:40:20.008+01	2026-02-07 07:40:20.009+01	2026-02-07 07:40:20.009+01
6fef1960-77cd-46cb-b224-120c753e519c	fbab207d-92ce-4d57-957d-e6a770ff35c9	9b624eeb-db90-4778-afdb-4643b028d740	2026-02-07 09:46:07.538+01	2026-02-07 09:46:07.538+01	2026-02-07 09:46:07.538+01
\.


--
-- Data for Name: Guests; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Guests" (id, guest_name, ip_address, country_code, region, latitude, longitude, last_seen, "createdAt", "updatedAt") FROM stdin;
aeff4df3-f41d-46ab-90fa-361235245727	guest2531	103.230.106.14	BD	Rajshahi, BD	24.449100	88.718600	2026-01-31 14:27:23.325+01	2026-01-31 14:27:03.664+01	2026-01-31 14:27:23.325+01
eded57c2-bae6-42ec-b751-e82b4d7da27a	guest2896	2401:4900:97ee:f034:7899:6933:f35e:2a3b	IN	Unknown, IN	21.997400	79.001100	2026-02-01 03:50:34.432+01	2026-02-01 03:49:22.245+01	2026-02-01 03:50:34.432+01
73069a2e-b17d-4909-bce5-3c2bbf4265eb	guest3298	66.249.71.164	TW	\N	\N	\N	\N	2026-02-01 12:59:05.411+01	2026-02-01 12:59:05.411+01
c68cb372-95f2-4a86-9b1d-5841d4e90147	guest9695	65.55.210.55	US	Unknown, US	47.603400	-122.341400	2026-02-01 13:15:53.232+01	2026-02-01 13:15:47.541+01	2026-02-01 13:15:53.232+01
2187a2d1-334a-4c9e-8e38-287090b82dd7	guest4138	65.55.210.197	US	Quincy, Washington	47.233000	-119.852000	2026-02-03 19:16:09.228+01	2026-02-03 19:16:09.263+01	2026-02-03 19:16:09.263+01
2769bdd2-60d3-4d8b-b60c-2c4cd23fc81e	guest5135	247.97.200.182 / 2401:4900:938c:e266:410d:dc49:72fe:63dc	IN	Bengaluru, Karnataka	12.975300	77.591000	2026-02-03 14:46:50.554+01	2026-02-03 14:39:45.876+01	2026-02-03 14:46:50.555+01
a9f6f8c3-a901-4190-a879-dd1a152f2a78	guest1598	2409:40f3:b4:baa4:5d6:d98c:e9d6:583a	IN	Malappuram, IN	11.080800	76.070200	2026-02-01 18:01:55.037+01	2026-02-01 16:55:58.108+01	2026-02-01 18:01:55.037+01
b3e9bec7-bdc2-4445-bc3d-ee23dbb25a96	guest7720	106.192.8.219	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-03 14:51:07.927+01	2026-02-03 14:34:54.69+01	2026-02-03 14:51:07.927+01
2ebc508c-8711-4444-9bca-84e30140e249	guest5349	250.252.153.152 / 2401:4900:935b:6daa:410d:dc49:72fe:63dc	IN	Patna, Bihar	25.581900	85.081800	2026-02-03 14:52:48.312+01	2026-02-03 14:34:53.982+01	2026-02-03 14:52:48.313+01
9052f511-7f9d-4fea-b6b3-b0143e0f484d	guest1468	2405:201:c030:e158:f5b3:aad6:abbf:6ba8	IN	Hyderabad, IN	17.372400	78.437800	2026-02-02 18:16:20.104+01	2026-02-02 16:54:33.345+01	2026-02-02 18:16:20.105+01
294282e4-3780-4fe1-9f0d-690745d85b78	guest8346	250.76.168.174 / 2401:4900:9358:6ad6:410d:dc49:72fe:63dc	IN	Patna, Bihar	25.581900	85.081800	2026-02-03 14:55:56.593+01	2026-02-03 14:55:56.6+01	2026-02-03 14:55:56.6+01
ba9a3784-1de9-4df3-9908-2d2ef2fa3356	guest6957	205.169.39.202	US	Engelhard, US	35.511800	-76.033100	2026-02-02 18:34:41.275+01	2026-02-02 18:34:37.568+01	2026-02-02 18:34:41.275+01
649447f4-17bd-4444-bba2-108e18df362a	guest9784	246.254.176.44 / 2401:4900:935b:3750:410d:dc49:72fe:63dc	IN	Patna, Bihar	25.581900	85.081800	2026-02-03 15:14:42.271+01	2026-02-03 15:09:59.739+01	2026-02-03 15:14:42.272+01
d6341ac2-64a4-4700-9d8b-56ece6c0f614	guest2352	2401:4900:937f:d76c:7c7d:f16e:a90e:3c89	IN	Unknown, IN	21.997400	79.001100	2026-02-02 18:36:09.46+01	2026-02-02 18:19:11.816+01	2026-02-02 18:36:09.461+01
3f429b21-1d95-46ec-895d-0056f02961f2	guest3072	180.153.236.37	CN	Unknown, CN	34.773200	113.722000	2026-02-01 21:25:59.311+01	2026-02-01 21:25:59.323+01	2026-02-01 21:25:59.323+01
f41dea91-2924-4a38-aa25-cdbe4872010b	guest2499	180.153.236.215	CN	\N	\N	\N	\N	2026-02-01 21:26:00.175+01	2026-02-01 21:26:00.175+01
0187b294-bf87-4561-a372-2384c460ca97	guest2293	66.249.66.43	US	\N	\N	\N	\N	2026-02-02 19:27:13.951+01	2026-02-02 19:27:13.951+01
1655daa1-bf8a-4f64-bdb1-48b48ca20374	guest2893	2405:201:c030:e158:3cdb:890c:f26a:8deb	IN	Hyderabad, IN	17.372400	78.437800	2026-02-01 21:30:57.595+01	2026-02-01 21:30:57.197+01	2026-02-01 21:30:57.596+01
4ce48855-294c-4172-bb0d-cfa27fcf5b21	guest1250	49.44.86.231	IN	Unknown, IN	21.997400	79.001100	2026-02-01 21:31:11.906+01	2026-02-01 21:31:10.261+01	2026-02-01 21:31:11.906+01
cef63e5d-f906-45c5-b207-dd0ad9c67a8a	guest7573	66.249.66.36	US	\N	\N	\N	\N	2026-02-02 14:00:09.037+01	2026-02-02 14:00:09.037+01
1b79e824-9b55-4e7b-9594-6256a2ee8720	guest5018	34.72.176.129	US	Council Bluffs, US	41.259100	-95.851700	2026-02-02 14:51:57.803+01	2026-02-02 14:51:57.808+01	2026-02-02 14:51:57.808+01
8f4c2559-d9d1-4563-9aa5-344debdad5f2	guest6166	65.55.210.20	US	Quincy, Washington	47.233000	-119.852000	2026-02-04 02:07:13.639+01	2026-02-04 02:07:13.679+01	2026-02-04 02:07:13.679+01
b4990f9a-6b4f-4ddc-be31-112c1d50a322	guest6703	66.249.71.204	TW	\N	\N	\N	\N	2026-02-02 15:15:01.895+01	2026-02-02 15:15:01.895+01
bf156b7f-36d8-4571-9e87-726ff911b7c0	guest5010	104.197.69.115	US	Council Bluffs, US	41.259100	-95.851700	2026-02-02 15:40:10.672+01	2026-02-02 14:52:44.677+01	2026-02-02 15:40:10.672+01
2008c80e-4ea2-4248-b264-2d89d7cc0c2a	guest7444	205.169.39.50	US	Engelhard, US	35.511800	-76.033100	2026-02-02 20:09:49.033+01	2026-02-02 20:09:46.065+01	2026-02-02 20:09:49.033+01
07414835-b2f2-4112-8e02-e2de6e4413c5	guest6328	205.169.39.55	US	Engelhard, US	35.511800	-76.033100	2026-02-02 20:55:58.501+01	2026-02-02 20:55:57.917+01	2026-02-02 20:55:58.501+01
c26d18ff-4041-4dd4-8536-c378a8e08413	guest8812	40.77.179.135	US	Boydton, US	36.653400	-78.375000	2026-02-03 01:52:53.979+01	2026-02-03 01:52:54.028+01	2026-02-03 01:52:54.028+01
2929aaa3-e9ea-4208-8e37-257012262dd0	guest5506	253.80.175.155 / 2401:4900:935c:808b:410d:dc49:72fe:63dc	IN	Patna, Bihar	25.581900	85.081800	2026-02-03 15:16:20.255+01	2026-02-03 15:16:20.291+01	2026-02-03 15:16:20.291+01
3f0b7ccd-8973-44aa-80bb-66f4b159d398	guest3046	115.114.104.220	IN	Mumbai, Maharashtra	19.074800	72.885600	2026-02-06 11:07:54.396+01	2026-02-04 15:54:26.757+01	2026-02-06 11:07:54.396+01
1b2928cb-262b-49fd-b632-09ba0a3a860d	guest8303	40.77.179.138	US	Quincy, Washington	47.233000	-119.852000	2026-02-03 15:24:17.078+01	2026-02-03 15:24:17.094+01	2026-02-03 15:24:17.094+01
d0510ef9-b86b-40e6-8799-06e55c3c70a1	guest2201	106.192.8.255	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-03 15:30:22.104+01	2026-02-03 15:22:39.623+01	2026-02-03 15:30:22.104+01
827183d3-1d46-43d2-a3f0-e4510a605001	guest4841	205.169.39.184	US	Santa Clara, California	37.383300	-121.983000	2026-02-04 10:19:33.628+01	2026-02-04 10:19:33.216+01	2026-02-04 10:19:33.629+01
7657b722-8ca2-40cb-ae15-4840dd8d7d5c	guest4615	49.37.154.184	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-03 04:45:17.867+01	2026-02-01 21:14:44.64+01	2026-02-03 04:45:17.867+01
24b15fb2-ac5c-43d6-b1cf-2d115c42833d	guest2312	65.55.210.107	US	Quincy, Washington	47.233000	-119.852000	2026-02-04 12:35:43.481+01	2026-02-04 12:35:43.51+01	2026-02-04 12:35:43.51+01
05d98f01-03d9-43c0-8a46-13cc30540779	guest9381	250.42.74.209 / 2405:201:c030:e158:5c6a:baaa:f533:945e	\N	\N	\N	\N	2026-02-03 06:00:19.383+01	2026-02-03 05:33:07.033+01	2026-02-03 06:00:19.383+01
38dcec0b-97ef-49c7-8722-4ee453fed820	guest9804	66.249.82.197	TW	\N	\N	\N	\N	2026-02-03 06:28:31.181+01	2026-02-03 06:28:31.181+01
ebfc670b-880a-4447-96cb-c5140c0e3b0f	guest4861	103.170.183.202	IN	Kolkata, West Bengal	22.564300	88.369300	2026-02-03 10:26:47.076+01	2026-02-02 20:49:57.222+01	2026-02-03 10:26:47.076+01
d5cb9c0a-b5e9-43f9-8f3e-9a74aeff6c51	guest2407	250.42.74.209 / 2405:201:c030:e158:3497:a60a:eb33:eded	IN	\N	\N	\N	\N	2026-02-03 11:32:59.271+01	2026-02-03 11:32:59.271+01
60f2872e-d56a-4f05-a260-85a449222e4a	guest7246	223.228.127.214	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-05 11:15:14.843+01	2026-02-05 11:08:13.262+01	2026-02-05 11:15:14.843+01
28956c93-a9aa-47e1-bb01-1829d5b38918	guest9669	250.183.47.121 / 2401:4900:935d:cd91:17b:fecd:9d48:e50b	IN	Patna, Bihar	25.581900	85.081800	2026-02-03 15:44:50.579+01	2026-02-03 15:30:29.016+01	2026-02-03 15:44:50.58+01
8cf83022-f7e3-4756-9227-635827aa96f8	guest7979	34.122.147.229	US	Council Bluffs, Iowa	41.261900	-95.860800	2026-02-03 17:48:07.582+01	2026-01-31 23:48:23.074+01	2026-02-03 17:48:07.583+01
83b91925-8ac6-448a-a991-c6f89278508c	guest8516	205.169.39.21	US	Santa Clara, California	37.383300	-121.983000	2026-02-03 17:48:28.702+01	2026-02-03 17:48:21.582+01	2026-02-03 17:48:28.702+01
faf36e1d-48d8-47f8-89d4-f4825bf24d47	guest3408	49.44.87.170	IN	\N	\N	\N	\N	2026-02-05 15:41:04.146+01	2026-02-05 15:41:04.146+01
da0261e2-7ed8-4055-88cd-63eeeb77b320	guest3327	241.238.182.61 / 2401:4900:96fa:58ca:295e:a161:b89b:30d1	IN	\N	\N	\N	\N	2026-02-06 12:18:19.461+01	2026-02-06 12:18:19.461+01
f0d25161-e19f-495c-a814-57f6c216cb45	guest2304	65.55.210.35	US	\N	\N	\N	\N	2026-02-04 23:15:27.226+01	2026-02-04 23:15:27.226+01
7f73dd2e-6c07-4565-a192-0f0b2c987de0	guest9856	248.144.189.78 / 2402:7500:a60:3497:d1fc:822:257c:884d	TW	\N	\N	\N	\N	2026-02-04 23:46:27.009+01	2026-02-04 23:46:27.009+01
ad806f36-8fde-48b7-834b-fbb4b98b3562	guest5206	101.8.160.223	TW	Tainan, Tainan	22.991700	120.214800	2026-02-04 23:46:28.452+01	2026-02-04 23:46:28.457+01	2026-02-04 23:46:28.457+01
3d1b3908-db4c-4837-ac4b-e726468c8ae5	guest1308	148.135.179.224	FR	\N	\N	\N	\N	2026-02-05 00:35:03.957+01	2026-02-05 00:35:03.957+01
eed16d27-0a2e-4d53-aef3-eaefe105ce53	guest4208	66.249.66.164	US	\N	\N	\N	\N	2026-02-05 01:34:33.226+01	2026-02-05 01:34:33.226+01
89caee27-0cfe-4f94-909a-ef483b882c12	guest5027	34.123.170.104	US	Council Bluffs, Iowa	41.261900	-95.860800	2026-02-05 15:41:05.871+01	2026-01-31 23:48:23.091+01	2026-02-05 15:41:05.871+01
58d78622-7e80-4894-9d2f-b4dd4b48278b	guest5580	242.3.229.167 / 2401:4900:9712:bad2:497:120e:3b16:bbe4	IN	\N	\N	\N	\N	2026-02-05 11:08:12.608+01	2026-02-05 11:08:12.608+01
27c85e9b-a6a3-437a-a1b3-a656b08ad9be	guest9618	65.55.210.229	US	Quincy, Washington	47.233000	-119.852000	2026-02-05 17:06:06.231+01	2026-02-05 16:49:58.854+01	2026-02-05 17:06:06.232+01
c13a75e3-d3c6-4260-9003-6146c6c305c1	guest2236	40.77.179.126	US	Quincy, Washington	47.233000	-119.852000	2026-02-05 19:29:58.725+01	2026-02-05 19:29:58.756+01	2026-02-05 19:29:58.756+01
f362bf97-7d38-4624-ade3-4b85c8763936	guest8198	115.114.104.219	IN	Mumbai, Maharashtra	19.074800	72.885600	2026-02-05 15:58:12.973+01	2026-02-05 08:42:51.758+01	2026-02-05 15:58:12.973+01
f1e4d8e8-d426-455e-9912-162eb69d38e6	guest4727	205.169.39.49	US	Santa Clara, California	37.383300	-121.983000	2026-02-05 19:50:01.559+01	2026-02-05 19:49:57.846+01	2026-02-05 19:50:01.559+01
c77dbd28-b828-4bc0-8aba-4c4aa8b94224	guest1182	65.55.210.128	US	Quincy, Washington	47.233000	-119.852000	2026-02-06 00:12:47.752+01	2026-02-06 00:12:47.787+01	2026-02-06 00:12:47.787+01
96e007cf-ca44-4a28-b7e1-a80513e8a9d9	guest4862	202.8.43.171	US	Sterling, Virginia	39.002400	-77.426900	2026-02-06 08:36:19.249+01	2026-02-01 15:30:16.571+01	2026-02-06 08:36:19.25+01
3ca241ad-4d8d-48df-a2ce-f5e9be90dac2	guest5799	223.228.125.225	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-06 12:18:19.933+01	2026-02-06 12:18:19.936+01	2026-02-06 12:18:19.936+01
369b7568-ab41-41d7-9286-06983e60a3bc	guest7758	223.228.127.225	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-06 15:19:27.124+01	2026-02-06 15:19:27.127+01	2026-02-06 15:19:27.127+01
ec0bc28d-6b88-4afa-9147-cba934be7736	guest1637	183.82.163.160	IN	Lucknow, Uttar Pradesh	26.837300	80.916500	2026-02-06 16:47:15.252+01	2026-02-06 16:47:13.399+01	2026-02-06 16:47:15.252+01
f54bb736-f86a-4807-91ce-c906862f28fc	guest2793	205.169.39.139	US	Santa Clara, California	37.383300	-121.983000	2026-02-07 00:10:41.109+01	2026-02-07 00:10:40.542+01	2026-02-07 00:10:41.109+01
ef399440-0de2-4e3e-991c-b95792449b33	guest2235	65.55.210.113	US	Quincy, Washington	47.233000	-119.852000	2026-02-07 01:10:06.286+01	2026-02-07 01:10:06.312+01	2026-02-07 01:10:06.312+01
984e12f7-83df-47cd-b548-c1e41d7e6e92	guest7307	40.77.167.23	US	\N	\N	\N	\N	2026-02-07 01:10:35.089+01	2026-02-07 01:10:35.089+01
ceef1ae2-3672-41cb-a62e-6fecff9ae403	guest3622	66.249.66.162	US	\N	\N	\N	\N	2026-02-07 03:30:52.786+01	2026-02-07 03:30:52.786+01
b7420051-a19c-4c33-a534-7f9e8ccaafdb	guest8405	103.75.11.61	NZ	\N	\N	\N	\N	2026-02-07 04:35:11.02+01	2026-02-07 04:35:11.02+01
a15008a3-3a16-4023-a94c-ecaca156c4ea	guest7445	94.156.148.106	CA	Montreal, Quebec	45.507500	-73.588700	2026-02-07 14:15:10.196+01	2026-02-07 14:15:03.559+01	2026-02-07 14:15:10.196+01
ac5e7a82-2106-4759-9c14-3c70df1fe8cb	guest5930	185.16.38.230	PL	Warsaw, Mazovia	52.195700	20.992100	2026-02-07 14:15:37.757+01	2026-02-07 14:15:34.651+01	2026-02-07 14:15:37.758+01
e045999f-e337-42b1-a727-a40b7e15dec7	guest6175	103.31.178.164	BD	Pābna, Rajshahi Division	24.006400	89.237200	2026-02-07 14:23:15.939+01	2026-02-07 10:47:57.813+01	2026-02-07 14:23:15.94+01
ab7d3fcf-b8f7-43ef-9b2e-2807b98ab96f	guest1026	207.244.71.81	US	Manassas, Virginia	38.749300	-77.471900	2026-02-07 14:23:37.482+01	2026-02-07 14:23:37.29+01	2026-02-07 14:23:37.486+01
55b7c247-71ab-4815-8a36-6d9d2cae4999	guest3061	40.77.179.250	US	Quincy, Washington	47.233000	-119.852000	2026-02-07 08:58:45.79+01	2026-02-07 08:58:45.828+01	2026-02-07 08:58:45.828+01
d06c7387-fa2c-4b67-afd6-c796af077c43	guest6675	5.255.118.82	NL	Dronten, Flevoland	52.537800	5.696600	2026-02-07 14:24:12.984+01	2026-02-07 14:24:12.612+01	2026-02-07 14:24:12.984+01
9dea2513-854a-46f3-96f2-ad9fd0aba6b8	guest4794	185.16.38.124	PL	\N	\N	\N	\N	2026-02-07 14:25:46.154+01	2026-02-07 14:25:46.154+01
efc7c1b6-edef-48ef-9b41-6d1eb73d73ed	guest3118	40.77.177.52	US	Quincy, Washington	47.233000	-119.852000	2026-02-07 09:39:25.978+01	2026-02-07 09:39:26.088+01	2026-02-07 09:39:26.088+01
127b3fff-695d-4fda-b157-d39bd8d3feab	guest4626	15.204.105.209	US	Hillsboro, Oregon	45.539700	-122.963800	2026-02-07 11:44:27.252+01	2026-02-07 11:44:27.098+01	2026-02-07 11:44:27.252+01
cf099ca6-721c-4d49-8c4d-9ceadf061a57	guest4038	209.126.10.147	US	St Louis, Missouri	38.636400	-90.198500	2026-02-07 11:46:36.551+01	2026-02-07 11:46:36.018+01	2026-02-07 11:46:36.552+01
f25ac942-85ab-4337-8a09-c0c3bb86235d	guest4392	103.75.11.109	NZ	\N	\N	\N	\N	2026-02-07 11:54:39.457+01	2026-02-07 11:54:39.457+01
04158966-002e-40af-910e-98bfd3f83021	guest4728	103.172.203.5	IN	Hyderabad, Telangana	17.384300	78.458300	2026-02-07 12:01:06.762+01	2026-02-07 11:07:57.308+01	2026-02-07 12:01:06.762+01
0050f20e-a263-4e9d-b862-bfd22a601072	guest2782	106.200.77.253	IN	Kochi, Kerala	9.940600	76.265300	2026-02-07 12:05:39.521+01	2026-02-07 12:05:37.272+01	2026-02-07 12:05:39.521+01
a337e255-3b9c-4e50-bfe1-bbb64d2aa532	guest6963	252.118.49.237 / 2401:4900:646c:4651:dc2c:1ecd:339c:71e	IN	Bengaluru, Karnataka	12.975300	77.591000	2026-02-07 12:37:08.573+01	2026-02-07 11:31:38.884+01	2026-02-07 12:37:08.573+01
44535b94-9d87-4098-940a-edd8c1a95759	guest4997	152.58.217.110	IN	Kochi, Kerala	9.940600	76.265300	2026-02-07 14:00:25.953+01	2026-02-07 14:00:23.231+01	2026-02-07 14:00:25.953+01
d096b02b-58a8-47b8-bdfd-2d26051b85c0	guest7177	240.65.135.170 / 2409:40f3:12c:16b7:21a7:4a09:fa17:b603	IN	\N	\N	\N	\N	2026-02-07 14:03:07.268+01	2026-02-07 14:03:07.268+01
\.


--
-- Data for Name: PersonalMessages; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PersonalMessages" (id, conversation_id, sender_id, message, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: PlantImages; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantImages" (id, plant_id, image_url, is_primary, caption) FROM stdin;
\.


--
-- Data for Name: PlantTag_Map; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantTag_Map" (plant_id, tag_id) FROM stdin;
\.


--
-- Data for Name: PlantTags; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."PlantTags" (id, tag_name) FROM stdin;
\.


--
-- Data for Name: SpeciesDictionary; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."SpeciesDictionary" (fish_id, common_name, scientific_name, family, origin, description, min_temp, max_temp, min_ph, max_ph, min_hardness, max_hardness, water_type, diet_type, diet_info, max_size_cm, min_tank_size_liters, care_level, temperament, compatibility_notes, primary_image, gallery_images, breeding_difficulty, breeding_notes, views_count, created_by, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."Users" (id, userid, name, dob, gender, email, password, role, status, failed_login_attempts, last_seen, community_rating, ip_address, country_code, region, latitude, longitude, "resetPasswordToken", "resetPasswordExpires", "deletionRequestedAt", "createdAt", "updatedAt") FROM stdin;
77724a80-b9a8-4602-a0a8-b23d58441cb2	mr.bnikhil	Nikhilesh R	1986-08-05	male	mr.bnikhil@gmail.com	$2b$10$Y1GiPKrYPD9QT3SrKyrlx.SGDCZTEy95l3R1Cqk8Ipb7VF/5iwv/a	user	active	0	2026-02-07 07:40:19.981+01	0	103.172.203.5	IN	Hyderabad, Telangana	17.384300	78.458300	\N	\N	\N	2026-02-07 07:40:19.985+01	2026-02-07 09:46:56.851+01
9b624eeb-db90-4778-afdb-4643b028d740	nikhileshreddy	nikhileshreddy	1986-08-05	male	nikhileshreddybhavanam@rediffmail.com	$2b$10$KDd/6FE2YQ84ScLavhAyyOSnhHPQ7kpI2I/.D/lBYv3nIra1.8Kim	admin	active	0	2026-02-07 09:46:07.515+01	0	103.172.203.5	IN	Hyderabad, Telangana	17.384300	78.458300	\N	\N	\N	2026-02-07 09:46:07.519+01	2026-02-07 09:50:44.153+01
6a08c1c8-a356-40f4-ac09-0e058187ecb9	khairul_aqua	Khairul Freelancer	1986-08-05	male	khairul.freelance3@gmail.com	$2b$10$xi.VN.lm0KcHcQ9Abpbqqe6raueACfc6oqilVDNviyYuP9W1PZP4u	admin	active	0	2026-02-07 14:55:00.179+01	0	103.172.203.5	IN	Hyderabad, Telangana	17.384300	78.458300	\N	\N	\N	2026-01-31 13:33:30.356+01	2026-02-07 14:55:00.18+01
\.


--
-- Data for Name: VideoGuides; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public."VideoGuides" (id, title, "youtubeLink", "channelAvatarUrl", description, "videoId", duration, "viewCount", category, "isActive", status, "submittedBy", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: communities; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.communities (id, name, description, is_private, created_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: community_members; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.community_members (id, community_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: community_messages; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.community_messages (id, community_id, user_id, message, edited_at, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: support_chat_messages; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.support_chat_messages (id, support_chat_id, sender_id, message, datestamp, created_at, updated_at) FROM stdin;
7edb5a38-3de2-437b-99c6-632b99deee0b	ab39f817-7498-44aa-aac0-d928a8b7fbcd	6a08c1c8-a356-40f4-ac09-0e058187ecb9	is it working?	2026-02-01 19:03:59.775+01	2026-02-01 19:03:59.775+01	2026-02-01 19:03:59.775+01
75bd5930-e8c3-45e7-ab44-1560fd1fa556	3cd6b23c-80fd-43b3-9fa7-53f95c458f23	6a08c1c8-a356-40f4-ac09-0e058187ecb9	Hello	2026-02-01 20:14:43.841+01	2026-02-01 20:14:43.841+01	2026-02-01 20:14:43.841+01
648fa20e-5b6d-4345-b0dc-14ed307c69c6	7dab2f39-e187-4c70-992d-9e5f49d61ccd	6a08c1c8-a356-40f4-ac09-0e058187ecb9	what is your feedback?	2026-02-03 06:01:30.136+01	2026-02-03 06:01:30.137+01	2026-02-03 06:01:30.137+01
\.


--
-- Data for Name: support_chats; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.support_chats (id, description, is_accepted, status, initiated_by, created_at, updated_at) FROM stdin;
ab39f817-7498-44aa-aac0-d928a8b7fbcd	Testing	t	active	\N	2026-02-01 19:03:12.463+01	2026-02-01 19:03:40.099+01
3cd6b23c-80fd-43b3-9fa7-53f95c458f23	testing	t	active	\N	2026-02-01 20:08:49.062+01	2026-02-01 20:14:28.1+01
7c146388-b3b1-42ac-a635-aa94674dd95e	testing5	t	active	\N	2026-02-01 20:17:37.758+01	2026-02-01 20:18:03.946+01
af8acd66-d9ed-404a-b11e-07d43483c806	Testing\n	t	active	\N	2026-02-02 18:15:51.637+01	2026-02-02 18:16:41.994+01
7dab2f39-e187-4c70-992d-9e5f49d61ccd	Testing	t	active	\N	2026-02-03 06:00:51.706+01	2026-02-03 06:01:17.699+01
\.


--
-- Data for Name: support_members; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.support_members (id, support_chat_id, user_id, is_locked, "createdAt", "updatedAt") FROM stdin;
e4565fd7-ded1-418b-8b43-e91474264df2	ab39f817-7498-44aa-aac0-d928a8b7fbcd	6a08c1c8-a356-40f4-ac09-0e058187ecb9	f	2026-02-01 19:03:12.482+01	2026-02-01 19:03:40.1+01
08e25dde-c232-481c-8a6f-a1da2adc51de	3cd6b23c-80fd-43b3-9fa7-53f95c458f23	6a08c1c8-a356-40f4-ac09-0e058187ecb9	f	2026-02-01 20:08:49.07+01	2026-02-01 20:14:28.102+01
9c08ac26-a161-469b-9c57-ce9014067bcb	7c146388-b3b1-42ac-a635-aa94674dd95e	6a08c1c8-a356-40f4-ac09-0e058187ecb9	f	2026-02-01 20:17:37.766+01	2026-02-01 20:18:03.948+01
a97bd6d3-bec1-4762-b35d-cb7463b98312	af8acd66-d9ed-404a-b11e-07d43483c806	6a08c1c8-a356-40f4-ac09-0e058187ecb9	f	2026-02-02 18:15:51.645+01	2026-02-02 18:16:41.998+01
50beb8bb-23a8-478b-a072-c8c2b09fd317	7dab2f39-e187-4c70-992d-9e5f49d61ccd	6a08c1c8-a356-40f4-ac09-0e058187ecb9	f	2026-02-03 06:00:51.717+01	2026-02-03 06:01:17.702+01
\.


--
-- Data for Name: text_authors; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.text_authors ("createdAt", "updatedAt", user_id, text_id) FROM stdin;
\.


--
-- Data for Name: textguides; Type: TABLE DATA; Schema: public; Owner: admin_aquaguide_db_user
--

COPY public.textguides (id, title, content, created_at, updated_at, status, author, rejection_justification, rejection_requested_by, rejection_status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: AdminLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public."AdminLogs_id_seq"', 14, true);


--
-- Name: AquaticPlants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public."AquaticPlants_id_seq"', 1, false);


--
-- Name: PlantImages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public."PlantImages_id_seq"', 1, false);


--
-- Name: PlantTags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_aquaguide_db_user
--

SELECT pg_catalog.setval('public."PlantTags_id_seq"', 1, false);


--
-- Name: AdminLogs AdminLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AdminLogs"
    ADD CONSTRAINT "AdminLogs_pkey" PRIMARY KEY (id);


--
-- Name: AquaticPlants AquaticPlants_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_pkey" PRIMARY KEY (id);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key1" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key10; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key10" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key11; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key11" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key12; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key12" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key13; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key13" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key14; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key14" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key15; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key15" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key16; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key16" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key17; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key17" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key18; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key18" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key19; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key19" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key2" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key20; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key20" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key21; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key21" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key22; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key22" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key3" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key4; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key4" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key5; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key5" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key6; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key6" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key7; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key7" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key8; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key8" UNIQUE (scientific_name);


--
-- Name: AquaticPlants AquaticPlants_scientific_name_key9; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."AquaticPlants"
    ADD CONSTRAINT "AquaticPlants_scientific_name_key9" UNIQUE (scientific_name);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: CommunityForums CommunityForums_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_pkey" PRIMARY KEY (id);


--
-- Name: ConversationParticipants ConversationParticipants_conversation_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."ConversationParticipants"
    ADD CONSTRAINT "ConversationParticipants_conversation_id_user_id_key" UNIQUE (conversation_id, user_id);


--
-- Name: ConversationParticipants ConversationParticipants_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."ConversationParticipants"
    ADD CONSTRAINT "ConversationParticipants_pkey" PRIMARY KEY (id);


--
-- Name: Conversations Conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Conversations"
    ADD CONSTRAINT "Conversations_pkey" PRIMARY KEY (id);


--
-- Name: FAQs FAQs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_pkey" PRIMARY KEY (id);


--
-- Name: FAQs FAQs_question_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key12; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key12" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key14; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key14" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key15; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key15" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key16; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key16" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key17; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key17" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key18; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key18" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key19; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key19" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key2" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key20; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key20" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key21; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key21" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key22; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key22" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key3" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key4; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key4" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key5; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key5" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key6; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key6" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key7; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key7" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key8; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key8" UNIQUE (question);


--
-- Name: FAQs FAQs_question_key9; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_question_key9" UNIQUE (question);


--
-- Name: GuestConversions GuestConversions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."GuestConversions"
    ADD CONSTRAINT "GuestConversions_pkey" PRIMARY KEY (id);


--
-- Name: Guests Guests_guest_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key1" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key10; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key10" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key11; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key11" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key12; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key12" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key13; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key13" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key14; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key14" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key15; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key15" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key16; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key16" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key17; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key17" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key18; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key18" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key19; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key19" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key2" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key20; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key20" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key21; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key21" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key22; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key22" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key3" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key4; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key4" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key5; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key5" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key6; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key6" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key7; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key7" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key8; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key8" UNIQUE (guest_name);


--
-- Name: Guests Guests_guest_name_key9; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_guest_name_key9" UNIQUE (guest_name);


--
-- Name: Guests Guests_ip_address_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key1" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key10; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key10" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key11; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key11" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key12; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key12" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key13; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key13" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key14; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key14" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key15; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key15" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key16; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key16" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key17; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key17" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key18; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key18" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key19; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key19" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key2" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key20; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key20" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key21; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key21" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key22; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key22" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key3" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key4; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key4" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key5; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key5" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key6; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key6" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key7; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key7" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key8; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key8" UNIQUE (ip_address);


--
-- Name: Guests Guests_ip_address_key9; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_ip_address_key9" UNIQUE (ip_address);


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- Name: PersonalMessages PersonalMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PersonalMessages"
    ADD CONSTRAINT "PersonalMessages_pkey" PRIMARY KEY (id);


--
-- Name: PlantImages PlantImages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages"
    ADD CONSTRAINT "PlantImages_pkey" PRIMARY KEY (id);


--
-- Name: PlantTag_Map PlantTag_Map_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT "PlantTag_Map_pkey" PRIMARY KEY (plant_id, tag_id);


--
-- Name: PlantTags PlantTags_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_pkey" PRIMARY KEY (id);


--
-- Name: PlantTags PlantTags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key1; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key1" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key10; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key10" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key11; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key11" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key12; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key12" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key13; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key13" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key14; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key14" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key15; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key15" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key16; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key16" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key17; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key17" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key18; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key18" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key19; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key19" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key2; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key2" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key20; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key20" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key21; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key21" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key22; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key22" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key3; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key3" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key4; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key4" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key5; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key5" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key6; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key6" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key7; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key7" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key8; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key8" UNIQUE (tag_name);


--
-- Name: PlantTags PlantTags_tag_name_key9; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTags"
    ADD CONSTRAINT "PlantTags_tag_name_key9" UNIQUE (tag_name);


--
-- Name: SpeciesDictionary SpeciesDictionary_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."SpeciesDictionary"
    ADD CONSTRAINT "SpeciesDictionary_pkey" PRIMARY KEY (fish_id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_userid_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_userid_key" UNIQUE (userid);


--
-- Name: VideoGuides VideoGuides_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."VideoGuides"
    ADD CONSTRAINT "VideoGuides_pkey" PRIMARY KEY (id);


--
-- Name: communities communities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.communities
    ADD CONSTRAINT communities_pkey PRIMARY KEY (id);


--
-- Name: community_members community_members_community_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_members
    ADD CONSTRAINT community_members_community_id_user_id_key UNIQUE (community_id, user_id);


--
-- Name: community_members community_members_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_members
    ADD CONSTRAINT community_members_pkey PRIMARY KEY (id);


--
-- Name: community_messages community_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_messages
    ADD CONSTRAINT community_messages_pkey PRIMARY KEY (id);


--
-- Name: support_chat_messages support_chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_chat_messages
    ADD CONSTRAINT support_chat_messages_pkey PRIMARY KEY (id);


--
-- Name: support_chats support_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_chats
    ADD CONSTRAINT support_chats_pkey PRIMARY KEY (id);


--
-- Name: support_members support_members_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_members
    ADD CONSTRAINT support_members_pkey PRIMARY KEY (id);


--
-- Name: support_members support_members_support_chat_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_members
    ADD CONSTRAINT support_members_support_chat_id_user_id_key UNIQUE (support_chat_id, user_id);


--
-- Name: text_authors text_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.text_authors
    ADD CONSTRAINT text_authors_pkey PRIMARY KEY (user_id, text_id);


--
-- Name: textguides textguides_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_pkey PRIMARY KEY (id);


--
-- Name: admin_logs_admin_email; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX admin_logs_admin_email ON public."AdminLogs" USING btree (admin_email);


--
-- Name: admin_logs_created_at; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX admin_logs_created_at ON public."AdminLogs" USING btree ("createdAt");


--
-- Name: community_members_community_id_user_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE UNIQUE INDEX community_members_community_id_user_id ON public.community_members USING btree (community_id, user_id);


--
-- Name: community_messages_community_id_created_at; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX community_messages_community_id_created_at ON public.community_messages USING btree (community_id, created_at);


--
-- Name: community_messages_user_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX community_messages_user_id ON public.community_messages USING btree (user_id);


--
-- Name: conversation_participants_conversation_id_user_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE UNIQUE INDEX conversation_participants_conversation_id_user_id ON public."ConversationParticipants" USING btree (conversation_id, user_id);


--
-- Name: species_dictionary_common_name_scientific_name; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE UNIQUE INDEX species_dictionary_common_name_scientific_name ON public."SpeciesDictionary" USING btree (common_name, scientific_name);


--
-- Name: support_chat_messages_sender_id; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX support_chat_messages_sender_id ON public.support_chat_messages USING btree (sender_id);


--
-- Name: support_chat_messages_support_chat_id_created_at; Type: INDEX; Schema: public; Owner: admin_aquaguide_db_user
--

CREATE INDEX support_chat_messages_support_chat_id_created_at ON public.support_chat_messages USING btree (support_chat_id, created_at);


--
-- Name: Comments Comments_forum_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_forum_id_fkey" FOREIGN KEY (forum_id) REFERENCES public."CommunityForums"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comments Comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CommunityForums CommunityForums_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CommunityForums CommunityForums_rejection_requested_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."CommunityForums"
    ADD CONSTRAINT "CommunityForums_rejection_requested_by_fkey" FOREIGN KEY (rejection_requested_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ConversationParticipants ConversationParticipants_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."ConversationParticipants"
    ADD CONSTRAINT "ConversationParticipants_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public."Conversations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ConversationParticipants ConversationParticipants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."ConversationParticipants"
    ADD CONSTRAINT "ConversationParticipants_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FAQs FAQs_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PersonalMessages PersonalMessages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PersonalMessages"
    ADD CONSTRAINT "PersonalMessages_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public."Conversations"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PersonalMessages PersonalMessages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PersonalMessages"
    ADD CONSTRAINT "PersonalMessages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: PlantImages PlantImages_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantImages"
    ADD CONSTRAINT "PlantImages_plant_id_fkey" FOREIGN KEY (plant_id) REFERENCES public."AquaticPlants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PlantTag_Map PlantTag_Map_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT "PlantTag_Map_plant_id_fkey" FOREIGN KEY (plant_id) REFERENCES public."AquaticPlants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PlantTag_Map PlantTag_Map_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."PlantTag_Map"
    ADD CONSTRAINT "PlantTag_Map_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES public."PlantTags"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SpeciesDictionary SpeciesDictionary_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."SpeciesDictionary"
    ADD CONSTRAINT "SpeciesDictionary_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: VideoGuides VideoGuides_submittedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public."VideoGuides"
    ADD CONSTRAINT "VideoGuides_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: communities communities_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.communities
    ADD CONSTRAINT communities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: community_members community_members_community_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_members
    ADD CONSTRAINT community_members_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.communities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: community_members community_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_members
    ADD CONSTRAINT community_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: community_messages community_messages_community_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_messages
    ADD CONSTRAINT community_messages_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.communities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: community_messages community_messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.community_messages
    ADD CONSTRAINT community_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: support_chat_messages support_chat_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_chat_messages
    ADD CONSTRAINT support_chat_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: support_chat_messages support_chat_messages_support_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_chat_messages
    ADD CONSTRAINT support_chat_messages_support_chat_id_fkey FOREIGN KEY (support_chat_id) REFERENCES public.support_chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: support_chats support_chats_initiated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_chats
    ADD CONSTRAINT support_chats_initiated_by_fkey FOREIGN KEY (initiated_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: support_members support_members_support_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_members
    ADD CONSTRAINT support_members_support_chat_id_fkey FOREIGN KEY (support_chat_id) REFERENCES public.support_chats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: support_members support_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.support_members
    ADD CONSTRAINT support_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: text_authors text_authors_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.text_authors
    ADD CONSTRAINT text_authors_text_id_fkey FOREIGN KEY (text_id) REFERENCES public.textguides(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: text_authors text_authors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.text_authors
    ADD CONSTRAINT text_authors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: textguides textguides_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_author_fkey FOREIGN KEY (author) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: textguides textguides_rejection_requested_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_aquaguide_db_user
--

ALTER TABLE ONLY public.textguides
    ADD CONSTRAINT textguides_rejection_requested_by_fkey FOREIGN KEY (rejection_requested_by) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO admin_aquaguide_db_user;


--
-- PostgreSQL database dump complete
--

\unrestrict zcCglgdopFS7ysxzVQnQH7eBHhLA2QbJQLdtsKz7V6QgHw5cWgbtcU9YHkGM8RM

