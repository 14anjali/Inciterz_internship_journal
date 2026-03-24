import Comments from './community_forum_comment.model.js';
import CommunityForum from "./community_forum_model.js";
import Community from "./community_chat.model.js";
import CommunityMember from "./community_member.model.js";
import CommunityMessage from "./community_chat_messages.model.js";
import User from "./user.model.js";
import Video from "./video.model.js";
import AquaticPlants from "./aquatic_plants.model.js";
import PlantImages from "./plant_images.model.js";
import PlantTags from "./plant_tags.model.js";
import PlantTagMap from "./plant_tag_map.model.js";
import Conversation from "./conversation.model.js";
import ConversationParticipant from "./conversation_participant.model.js";
import PersonalMessage from "./personal_message.model.js";
import SupportChat from "./support_chat.model.js";
import SupportChatMessage from "./support_chat_message.model.js";
import SupportMember from "./support_member.model.js";
import FAQ from "./faq.model.js";

CommunityForum.hasMany(Comments, { as: "Comments", foreignKey: "forum_id" });
User.hasMany(CommunityForum, {
    foreignKey: "creator_id",
    onDelete: "CASCADE"
});
CommunityForum.belongsTo(User, {
    foreignKey: "creator_id",
    as: "User",
    onDelete: "CASCADE",
});
Comments.belongsTo(CommunityForum, { as: "CommunityForum", foreignKey: "forum_id" });
Comments.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
User.hasMany(Comments, { foreignKey: "user_id" })

// ================= COMMUNITY CHAT ASSOCIATIONS =================
User.hasMany(Community, {
    foreignKey: "created_by",
    as: "createdCommunities",
});

User.belongsToMany(Community, {
    through: CommunityMember,
    foreignKey: "user_id",
    otherKey: "community_id",
    as: "joinedCommunities",
});

User.hasMany(CommunityMessage, {
    foreignKey: "user_id",
    as: "communityMessages",
});

Community.belongsTo(User, {
    foreignKey: "created_by",
    as: "creator",
    onDelete: "CASCADE",
});

Community.belongsToMany(User, {
    through: CommunityMember,
    foreignKey: "community_id",
    otherKey: "user_id",
    as: "members",
});

Community.hasMany(CommunityMessage, {
    foreignKey: "community_id",
    as: "messages",
});

CommunityMember.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
});

CommunityMember.belongsTo(Community, {
    foreignKey: "community_id",
    as: "community",
});

CommunityMessage.belongsTo(User, {
    foreignKey: "user_id",
    as: "sender",
    onDelete: "CASCADE",
});

CommunityMessage.belongsTo(Community, {
    foreignKey: "community_id",
    as: "community",
});

// Video guide associations
User.hasMany(Video, {
    foreignKey: "submittedBy",
    as: "VideoGuides",
});
Video.belongsTo(User, {
    foreignKey: "submittedBy",
    as: "owner",
    onDelete: "CASCADE",
});

// Aquatic Plants Associations
AquaticPlants.hasMany(PlantImages, { foreignKey: 'plant_id', as: 'images' });
PlantImages.belongsTo(AquaticPlants, { foreignKey: 'plant_id' });

AquaticPlants.belongsToMany(PlantTags, { through: PlantTagMap, foreignKey: 'plant_id', otherKey: 'tag_id', as: 'tags' });
PlantTags.belongsToMany(AquaticPlants, { through: PlantTagMap, foreignKey: 'tag_id', otherKey: 'plant_id', as: 'plants' });

// ================= PRIVATE CONVERSATION ASSOCIATIONS =================
// User <-> Conversation (Many-to-Many through ConversationParticipant)
User.belongsToMany(Conversation, {
    through: ConversationParticipant,
    foreignKey: "user_id",
    otherKey: "conversation_id",
    as: "conversations",
});

Conversation.belongsToMany(User, {
    through: ConversationParticipant,
    foreignKey: "conversation_id",
    otherKey: "user_id",
    as: "participants",
});

// Conversation has many ConversationParticipants
Conversation.hasMany(ConversationParticipant, {
    foreignKey: "conversation_id",
    as: "conversationParticipants",
});

// ConversationParticipant belongs to Conversation
ConversationParticipant.belongsTo(Conversation, {
    foreignKey: "conversation_id",
    as: "conversation",
});

// ConversationParticipant belongs to User
ConversationParticipant.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
});

// User has many ConversationParticipants
User.hasMany(ConversationParticipant, {
    foreignKey: "user_id",
    as: "participations",
});

// Conversation has many messages
Conversation.hasMany(PersonalMessage, {
    foreignKey: "conversation_id",
    as: "messages",
});

// PersonalMessage belongs to User (sender)
PersonalMessage.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender",
    onDelete: "CASCADE",
});

// PersonalMessage belongs to Conversation
PersonalMessage.belongsTo(Conversation, {
    foreignKey: "conversation_id",
    as: "conversation",
});

// User has many sent messages
User.hasMany(PersonalMessage, {
    foreignKey: "sender_id",
    as: "sentMessages",
});

// ================= SUPPORT CHAT ASSOCIATIONS =================
// SupportChat has many SupportChatMessages
SupportChat.hasMany(SupportChatMessage, {
    foreignKey: "support_chat_id",
    as: "messages"
});

// SupportChatMessage belongs to User (sender)
SupportChatMessage.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender",
    onDelete: "SET NULL"
});

// SupportChat <-> SupportMember associations
SupportChat.hasMany(SupportMember, {
    foreignKey: "support_chat_id",
    as: "supportMembers"
});

SupportMember.belongsTo(SupportChat, {
    foreignKey: "support_chat_id",
    as: "support_chat"
});

// User <-> SupportMember associations
User.hasMany(SupportMember, {
    foreignKey: "user_id",
    as: "supportMemberships"
});

SupportMember.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE"
});

// Many-to-Many: SupportChat <-> User through SupportMember
SupportChat.belongsToMany(User, {
    through: SupportMember,
    foreignKey: "support_chat_id",
    otherKey: "user_id",
    as: "members"
});

User.belongsToMany(SupportChat, {
    through: SupportMember,
    foreignKey: "user_id",
    otherKey: "support_chat_id",
    as: "supportChats"
});

// SupportChat initiated by User
SupportChat.belongsTo(User, {
    foreignKey: "initiated_by",
    as: "initiator",
    onDelete: "SET NULL",
});



// ================= FAQ ASSOCIATIONS =================
User.hasMany(FAQ, {
    foreignKey: "created_by",
    as: "createdFaqs"
});

FAQ.belongsTo(User, {
    foreignKey: "created_by",
    as: "creator",
    onDelete: "SET NULL"
});

export default function setupAssociations() {
    console.log("setupAssociations CALLED - all associations configured");
}
