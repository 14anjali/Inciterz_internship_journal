export interface RegisterPayload {
  name: string;
  email: string;
  userid: string;
  password: string;
  dob: string;
  gender: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  userid: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  tokenExpiry?: string;
}

export interface LoginResponse {
  message: string;
  user: RegisterResponse;
}

export interface SpeciesDictionaryResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  filters: Filters;
  species: Species[];
}

export interface Species {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  water_type: string;
  care_level: string;
  origin: string;
}

export interface Filters {
  search: string;
  water_type: string;
  care_level: string;
  category: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

// export interface UserDetailsResponse {
//   id: string;
//   userid: string;
//   name: string;
//   email: string;
//   dob: string; // ISO date string, e.g. "1990-01-01"
//   gender: "male" | "female" | "rather_not_say";
//   role: "user" | "admin" | "support";
//   status: "active" | "inactive" | "locked";
//   community_rating: number;
//   createdAt: string; // ISO date string
//   videos_posted: number;
//   articles_posted: number;
// }

export interface RoleResponse {
  role: string;
}

export interface VideoPayload {
  title: string;
  youtubeLink: string;
  category?: string;
  description?: string;
}

export interface VideoResponse {
  message: string;
  video: VideoArray;
}

export interface VideoArray {
  id: string;
  title: string;
  youtubeLink: string;
  channelAvatarUrl: string;
  description: string;
  videoId: string;
  duration: number | null;
  viewCount: number;
  category: string;
  isActive: boolean;
  status: "approved" | "pending" | "rejected"; // union for safety
  submittedBy: string;
  is_ownership_transferred: boolean;
  original_owner_name: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface approvalIds {
  ids: string[];
}

export interface rejectorapproveIds {
  ids: string[];
  status: string;
}

export interface AdminVideoListResponse {
  message: string;
  video: VideoArray[];
}

export interface getVideoResponse {
  videos: VideoArray[];
  pagination: paginate;
}

export interface Guest {
  id: string;
  guest_name: string;
  ip_address: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string; // UUID
  userid: string; // username
  name: string;
  dob: string; // ISO date string (YYYY-MM-DD)
  gender: "male" | "female" | "other";
  email: string;
  password: string; // hashed password
  role: "user" | "admin" | "support";
  status: "active" | "inactive" | "locked";
  failed_login_attempts: number;
  last_seen: string; // ISO datetime string
  community_rating: number;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export interface UserDetailsResponse {
  title: string;
  users: User[];
  pagination: paginate;
}

export interface paginate {
  total_items: number;
  current_page: number;
  totalPages: number;
  pageSize: number;
}

export interface TextGuidePayload {
  title: string;
  content: string;
}

export interface TextGuide {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  status: "approved" | "pending" | "rejected"; // you can adjust based on your possible statuses
  authorUser: author;
  rejection_justification?: string | null;
  rejection_requested_by?: string | null;
  rejection_status?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface author {
  id: string;
  userid: string;
  email: string;
  role: "admin" | "user" | "support";
}

export interface Pagination {
  total_items: number;
  current_page: number;
  totalPages: number;
  pageSize: number;
}

export interface GetAllTextGuidesResponse {
  data: TextGuide[]; // array of guides
  pagination: Pagination; // pagination info
}

export interface SpeciesFormData {
  category?: "fish" | "aquaticplants" | "macroalgae";
  common_name: string;
  scientific_name: string;
  genus?: string;
  specific_epithet?: string;
  infraspecific_epithet?: string;
  taxonomic_rank?: string;
  identification_qualifier?: string;
  family?: string;
  origin?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  organism_group?: string;
  water_type: string;
  min_temp?: number;
  max_temp?: number;
  min_ph?: number;
  max_ph?: number;
  min_hardness?: number;
  max_hardness?: number;
  kh_min?: number;
  kh_max?: number;
  salinity_ppt_min?: number;
  salinity_ppt_max?: number;
  nitrate_max_mg_l?: number;
  diet_type?: string;
  care_level?: string;
  temperament?: string;
  max_size_cm?: number;
  min_tank_size_liters?: number;
  diet_info?: string;
  description?: string;
  primary_image?: string;
  gallery_images?: string[];
  breeding_difficulty?: string;
  breeding_notes?: string;
  is_fin_nipper?: boolean;
  has_delicate_fins?: boolean;
  swimming_level?: "Top" | "Middle" | "Bottom";
  compatibility_notes?: string;

  // New Encyclopedic Fields
  lifespan_years?: string;
  social_needs?: string;
  filtration_requirement?: string;
  common_diseases?: CommonDisease[];
  varieties?: string;
  bioload?: string;
  recommended_substrate?: string;
  plant_safety?: string;
  breeding_triggers?: string;
  spawning_process?: string;
  fry_development?: FryStage[];
  tank_mates?: string;
  common_myths?: string;
  co2_required?: boolean;
  co2_optimal_ppm?: number;
  substrate_type?: string;
  propogation_method?: string;
  max_height_cm?: number;
  is_true_aquatic?: boolean;
  native_status?: string;
  deficiency_indicators?: any;
  
  status: string;
}

export interface CommonDisease {
  condition: string;
  symptoms: string;
  potential_cause: string;
}

export interface FryStage {
  stage: string;
  timeframe: string;
  care_requirement: string;
}

export interface AddSpeciesResponse {
  message: string;
  fish_id: string;
  common_name: string;
  scientific_name: string;
}

export interface GetSpeciesManagementResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  species: SpeciesItem[];
}

export interface SpeciesItem {
  id?: string;
  category?: string;
  fish_id: string;
  common_name: string;
  scientific_name: string;
  genus?: string;
  specific_epithet?: string;
  infraspecific_epithet?: string;
  taxonomic_rank?: string;
  identification_qualifier?: string;
  family?: string;
  origin?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  organism_group?: string;
  water_type: string;
  min_temp?: number;
  max_temp?: number;
  min_ph?: number;
  max_ph?: number;
  min_hardness?: number;
  max_hardness?: number;
  kh_min?: number;
  kh_max?: number;
  salinity_ppt_min?: number;
  salinity_ppt_max?: number;
  nitrate_max_mg_l?: number;
  diet_type?: string;
  care_level?: string;
  temperament?: string;
  max_size_cm?: number;
  min_tank_size_liters?: number;
  diet_info?: string;
  description: string;
  primary_image?: string;
  gallery_images?: string[];
  breeding_difficulty?: string;
  breeding_notes?: string;
  is_fin_nipper?: boolean;
  has_delicate_fins?: boolean;
  swimming_level?: "Top" | "Middle" | "Bottom";
  compatibility_notes?: string;

  // New Encyclopedic Fields
  lifespan_years?: string;
  social_needs?: string;
  filtration_requirement?: string;
  common_diseases?: CommonDisease[];
  varieties?: string;
  bioload?: string;
  recommended_substrate?: string;
  plant_safety?: string;
  breeding_triggers?: string;
  spawning_process?: string;
  fry_development?: FryStage[];
  tank_mates?: string;
  common_myths?: string;
  co2_required?: boolean;
  co2_optimal_ppm?: number;
  substrate_type?: string;
  propogation_method?: string;
  max_height_cm?: number;
  is_true_aquatic?: boolean;
  native_status?: string;
  deficiency_indicators?: any;

  views_count: number;
  created_by?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SearchSpeciesParams {
  query?: string;
  waterType?: string;
  careLevel?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface GetSearchResponse {
  query: string;
  count: number;
  results: SpeciesItem[];
}
export interface UserSummaryStatsResponse {
  success: true;
  data: {
    total_registered_users: number;
    inactive_users: number;
    active_users: number;
    locked_users: number;
    support_users: number;
    admin_users: number;
    guest_users: number;
  };
}

export interface TextGuidePayload {
  title: string;
  content: string;
}

export interface TextGuide {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  status: "approved" | "pending" | "rejected"; // you can adjust based on your possible statuses
  author: author;
  rejection_justification?: string | null;
  rejection_requested_by?: string | null;
  rejection_status?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface author {
  id: string;
  userid: string;
  email: string;
  role: "admin" | "user" | "support";
}

// export interface Pagination {
//   total_items: number;
//   current_page: number;
//   totalPages: number;
//   pageSize: number;
// }

export interface GetAllTextGuidesResponse {
  data: TextGuide[]; // array of guides
  pagination: Pagination; // pagination info
}

export interface CommunityForum {
  id: string;
  title: string;
  content: string;
  creator_id: string;
  likes: string[];
  dislike: string[];
  is_private: boolean;
  status: "approved" | "rejected" | "pending";
  Total_Comments: string | null;
  Creator_Username: string | null;
  rejection_justification: string | null;
  rejection_requested_by: string | null;
  rejection_status: "pending" | "approved" | "rejected";
  image_url: string | null;
  is_ownership_transferred: boolean;
  original_owner_name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationItem {
  id: string;
  count: number;
}

export interface PaginationMeta {
  total_items: PaginationItem[];
  total_pages: number | null;
  page_size: number;
}
export interface getAllCommunityForum {
  data: CommunityForum[];
  pagination: PaginationMeta;
}

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  forum_id: string;
  UserId: string;
  is_ownership_transferred: boolean;
  original_owner_name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentPayload {
  content: string;
}

export interface CommentResponse {
  data: Comment;
  message: string;
}

export interface CommunityRoom {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatRoomsResponse {
  success: boolean;
  data: CommunityRoom[];
}

export interface CommunityMessage {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  type: "text" | "image" | "file";
  file_url: string | null;
  is_deleted: boolean;
  is_ownership_transferred: boolean;
  created_at: string;
  updated_at: string;
  User: {
    id: string;
    userid: string;
    name: string;
  };
}

export interface ChatMessagesResponse {
  success: boolean;
  data: CommunityMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ChatUser {
  id: string;
  userid: string;
  name: string;
  role: string;
  last_seen: string;
  email: string;
  status: string;
}

export interface ChatUsersResponse {
  success: boolean;
  data: ChatUser[];
}

export interface ChatUploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    mimetype: string;
  };
}
export interface CommunityForumDetailResponse {
  message: string;
  data: CommunityForum;
  comments: Comment[];
  total_comments: number;
}

export interface CommunityApproveRejectDeleteResponse {
  message: string;
}

export interface LikeDislikeCommunity {
  data: CommunityForum;
  message: string;
}

export interface CommunityForumPayload {
  title: string;
  content: string;
}

export interface LikeDislikePayload {
  forum_id: string;
}
export interface GetSpeciesDetailResponse {
  species: SpeciesItem;
  related_species: SpeciesItem[];
}

// ================= PRIVATE CONVERSATION TYPES =================
export interface PrivateConversation {
  id: string;
  type: "private" | "group";
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
  otherUser: {
    id: string;
    name: string;
    userid: string;
  };
  lastMessage: PrivateMessage | null;
}

export interface PrivateMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    name: string;
    userid: string;
  };
}

export interface CreatePrivateConversationResponse {
  success: boolean;
  conversation: {
    id: string;
    type: string;
    last_message_at: string | null;
  };
  message: string;
}

export interface PrivateMessagesResponse {
  success: boolean;
  data: PrivateMessage[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    totalItems: number;
  };
}

// ================= COMMUNITY CHAT TYPES (EXTENDED) =================
export interface CommunitySection {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMember {
  id: string;
  user_id: string;
  community_id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  community: {
    id: string;
    name: string;
    description: string;
  };
}

// ================= SUPPORT CHAT TYPES =================
export interface supportChatResponse {
  success: boolean;
  chat: {
    id: string;
    initiated_by: string;
    description: string;
    is_accepted: boolean;
    status: "active" | "resolved";
    created_at: string;
    updated_at: string;
  };
}

// ================= COMMUNITY CHAT API TYPES =================
export interface communityChatPayload {
  name: string;
  description: string;
  is_private: boolean;
}

export interface communityChatResponse {
  success: boolean;
  message: string;
  data: CommunitySection;
}

export interface JoinedCommunityResponse {
  success: boolean;
  data: CommunityMember[];
}

export interface AllCommunityResponse {
  success: boolean;
  data: CommunitySection[];
}

// ================= ONLINE STATUS TYPES =================
export interface OnlineStatusResponse {
  success: boolean;
  data: {
    isOnline: boolean;
    lastSeen: string | null;
  };
}

export interface BulkOnlineStatusResponse {
  success: boolean;
  data: {
    [userId: string]: {
      isOnline: boolean;
      lastSeen: string | null;
    };
  };
}
