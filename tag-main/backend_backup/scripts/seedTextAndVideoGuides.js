import sequelize from "../lib/db.js";
import TextModel from "../models/text.model.js";
import VideoGuide from "../models/video.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Check existing counts
    const textCount = await TextModel.count();
    const videoCount = await VideoGuide.count();

    console.log(`Current text guides count: ${textCount}`);
    console.log(`Current video guides count: ${videoCount}`);

    // Get or create a test user for author/submittedBy
    let testUser = await User.findOne({ where: { role: "admin" } });
    if (!testUser) {
      testUser = await User.findOne();
    }
    if (!testUser) {
      console.log("No users found. Please create a user first.");
      process.exit(1);
    }

    // Seed Text Guides if needed
    if (textCount < 50) {
      const textGuidesToCreate = 50 - textCount;
      console.log(`Creating ${textGuidesToCreate} text guides...`);

      const textGuideTitles = [
        "Complete Guide to Freshwater Aquarium Setup",
        "Understanding Water Chemistry in Aquariums",
        "Best Practices for Fish Feeding",
        "Aquarium Filtration Systems Explained",
        "Choosing the Right Substrate for Your Tank",
        "Lighting Requirements for Planted Tanks",
        "Common Aquarium Fish Diseases and Treatments",
        "How to Cycle Your Aquarium Properly",
        "Aquascaping Techniques for Beginners",
        "Maintaining Optimal Water Temperature",
        "CO2 Injection Systems for Planted Tanks",
        "Algae Control and Prevention Methods",
        "Breeding Tropical Fish Successfully",
        "Quarantine Tank Setup and Usage",
        "Understanding pH and Hardness Levels",
        "Live Plants vs Artificial Decorations",
        "Tank Size Requirements for Different Fish",
        "Water Change Frequency and Methods",
        "Heater Selection and Placement",
        "Community Tank Compatibility Guide",
        "Saltwater vs Freshwater Aquariums",
        "Protein Skimmers for Marine Tanks",
        "Coral Care and Maintenance",
        "Reef Tank Lighting Solutions",
        "Marine Fish Compatibility Chart",
        "Setting Up a Nano Reef Tank",
        "Water Testing Kits and Parameters",
        "Emergency Fish Care Procedures",
        "Tank Cleaning and Maintenance Schedule",
        "Choosing the Right Filter Media",
        "Bettas: Care and Breeding Guide",
        "Goldfish Tank Setup and Care",
        "Cichlid Species and Compatibility",
        "Shrimp Keeping for Beginners",
        "Snail Species in Aquariums",
        "Pleco Care and Tank Requirements",
        "Tetra Species Care Guide",
        "Angelfish Breeding Techniques",
        "Discus Fish Care Essentials",
        "Oscar Fish Tank Setup Guide",
        "Rainbowfish Species Overview",
        "Gourami Care and Behavior",
        "Barbs: Species and Care Guide",
        "Catfish Varieties for Aquariums",
        "Livebearer Fish Breeding Guide",
        "Killifish Care and Maintenance",
        "Pufferfish Species and Requirements",
        "Eel Species for Home Aquariums",
        "Stingray Care in Captivity",
        "Advanced Aquascaping Techniques",
      ];

      const textGuideDescriptions = [
        "A comprehensive guide covering everything you need to know about setting up your first freshwater aquarium, from tank selection to water cycling.",
        "Learn about the essential water chemistry parameters including pH, ammonia, nitrite, and nitrate levels and how to maintain them.",
        "Discover the best feeding practices for different types of aquarium fish, including frequency, portion sizes, and food types.",
        "An in-depth look at different filtration systems including mechanical, biological, and chemical filtration methods.",
        "Guide to choosing the right substrate for your aquarium based on fish species, plants, and aesthetic preferences.",
        "Understanding the lighting needs of aquatic plants and how to select the right lighting system for your planted tank.",
        "Common diseases affecting aquarium fish, their symptoms, causes, and effective treatment methods.",
        "Step-by-step guide to the nitrogen cycle and how to properly cycle your aquarium before adding fish.",
        "Introduction to aquascaping, including design principles, plant selection, and layout techniques.",
        "How to maintain consistent water temperature and choose the right heater for your aquarium size.",
        "Complete guide to CO2 injection systems, including equipment selection, setup, and maintenance.",
        "Methods for controlling and preventing algae growth in your aquarium through proper maintenance and lighting.",
        "Essential information for successfully breeding tropical fish in home aquariums.",
        "How to set up and use a quarantine tank to protect your main aquarium from diseases.",
        "Understanding pH and water hardness, their importance, and how to adjust them safely.",
        "Comparison between live plants and artificial decorations, including pros and cons of each.",
        "Tank size requirements for various fish species to ensure healthy and happy fish.",
        "Best practices for water changes including frequency, volume, and proper techniques.",
        "How to select and properly place aquarium heaters for optimal temperature distribution.",
        "Guide to creating a harmonious community tank with compatible fish species.",
        "Comparison between saltwater and freshwater aquariums, including setup differences and care requirements.",
        "Understanding protein skimmers and their role in maintaining water quality in marine tanks.",
        "Essential care tips for keeping corals healthy in reef aquariums.",
        "Lighting solutions specifically designed for reef tanks and coral growth.",
        "Compatibility chart for common marine fish species to help plan your saltwater tank.",
        "Step-by-step guide to setting up a small nano reef tank for beginners.",
        "Overview of water testing kits and the key parameters you need to monitor regularly.",
        "Emergency procedures for handling fish health crises and equipment failures.",
        "Recommended cleaning and maintenance schedule to keep your aquarium healthy.",
        "Guide to different filter media types and how to use them effectively.",
        "Complete care guide for betta fish including tank setup, feeding, and breeding.",
        "Everything you need to know about setting up and maintaining a goldfish tank.",
        "Overview of cichlid species and their compatibility in community tanks.",
        "Beginner-friendly guide to keeping freshwater shrimp in your aquarium.",
        "Information about different snail species and their roles in aquarium ecosystems.",
        "Care requirements and tank setup for plecostomus and other sucker-mouth catfish.",
        "Care guide for various tetra species and their tank requirements.",
        "Techniques for successfully breeding angelfish in home aquariums.",
        "Essential care information for discus fish, known for their specific requirements.",
        "Complete setup guide for oscar fish, including tank size and compatibility.",
        "Overview of rainbowfish species and their care requirements.",
        "Care guide for gourami fish including behavior and tank setup.",
        "Information about barb species and their care requirements.",
        "Overview of catfish species suitable for home aquariums.",
        "Guide to breeding livebearer fish like guppies, mollies, and platies.",
        "Care and maintenance guide for killifish species.",
        "Species overview and care requirements for pufferfish in aquariums.",
        "Information about eel species that can be kept in home aquariums.",
        "Advanced care guide for keeping stingrays in large aquariums.",
        "Advanced techniques for creating stunning aquascapes in your aquarium.",
      ];

      for (let i = 0; i < textGuidesToCreate; i++) {
        const titleIndex = i % textGuideTitles.length;
        // Keep content under 255 characters to match database schema
        const shortContent = textGuideDescriptions[titleIndex].substring(0, 200);
        await TextModel.create({
          title: textGuideTitles[titleIndex],
          content: shortContent,
          author: testUser.id,
          status: "approved",
        });
      }
      console.log(`✓ Created ${textGuidesToCreate} text guides`);
    } else {
      console.log("✓ Text guides already have sufficient data");
    }

    // Seed Video Guides if needed
    if (videoCount < 50) {
      const videosToCreate = 50 - videoCount;
      console.log(`Creating ${videosToCreate} video guides...`);

      const videoTitles = [
        "Complete Freshwater Aquarium Setup Tutorial",
        "Water Chemistry Basics Explained",
        "Fish Feeding Best Practices",
        "Aquarium Filtration Systems Guide",
        "Choosing the Perfect Substrate",
        "Planted Tank Lighting Guide",
        "Common Fish Diseases and Cures",
        "Aquarium Cycling Made Easy",
        "Aquascaping for Beginners",
        "Temperature Control in Aquariums",
        "CO2 Systems for Planted Tanks",
        "Algae Control Methods",
        "Breeding Tropical Fish",
        "Quarantine Tank Setup",
        "pH and Water Hardness Guide",
        "Live Plants Care Guide",
        "Tank Size Requirements",
        "Water Change Techniques",
        "Heater Selection Guide",
        "Community Tank Setup",
        "Saltwater vs Freshwater Comparison",
        "Protein Skimmer Guide",
        "Coral Care Essentials",
        "Reef Tank Lighting",
        "Marine Fish Compatibility",
        "Nano Reef Tank Setup",
        "Water Testing Guide",
        "Emergency Fish Care",
        "Tank Maintenance Schedule",
        "Filter Media Selection",
        "Betta Fish Care Guide",
        "Goldfish Tank Setup",
        "Cichlid Species Guide",
        "Shrimp Keeping Basics",
        "Snail Species Overview",
        "Pleco Care Guide",
        "Tetra Species Care",
        "Angelfish Breeding",
        "Discus Fish Care",
        "Oscar Fish Setup",
        "Rainbowfish Guide",
        "Gourami Care Tips",
        "Barb Species Overview",
        "Catfish Varieties",
        "Livebearer Breeding",
        "Killifish Care",
        "Pufferfish Guide",
        "Eel Species Care",
        "Stingray Setup",
        "Advanced Aquascaping",
      ];

      const videoDescriptions = [
        "Step-by-step tutorial on setting up your first freshwater aquarium from scratch.",
        "Understanding essential water chemistry parameters for healthy aquariums.",
        "Learn the best feeding practices for different aquarium fish species.",
        "Complete guide to aquarium filtration systems and their maintenance.",
        "How to choose the right substrate for your specific aquarium needs.",
        "Lighting requirements and solutions for planted aquariums.",
        "Identifying and treating common diseases in aquarium fish.",
        "Simple guide to cycling your aquarium before adding fish.",
        "Introduction to aquascaping techniques and design principles.",
        "Maintaining optimal water temperature in your aquarium.",
        "Setting up and maintaining CO2 injection systems.",
        "Effective methods for controlling algae in aquariums.",
        "Breeding techniques for tropical fish species.",
        "Setting up and using quarantine tanks effectively.",
        "Understanding and adjusting pH and water hardness.",
        "Care guide for live aquatic plants.",
        "Determining the right tank size for your fish.",
        "Best practices for aquarium water changes.",
        "Selecting and installing aquarium heaters.",
        "Creating harmonious community tanks.",
        "Comparing saltwater and freshwater aquarium setups.",
        "Using protein skimmers in marine tanks.",
        "Essential care for coral in reef tanks.",
        "Lighting solutions for reef aquariums.",
        "Compatibility guide for marine fish species.",
        "Setting up small nano reef tanks.",
        "Using water testing kits effectively.",
        "Handling aquarium emergencies.",
        "Maintenance schedules for healthy aquariums.",
        "Choosing the right filter media.",
        "Complete care guide for betta fish.",
        "Goldfish tank setup and maintenance.",
        "Cichlid species and compatibility guide.",
        "Beginner's guide to keeping shrimp.",
        "Overview of aquarium snail species.",
        "Pleco care and tank requirements.",
        "Tetra species care guide.",
        "Breeding angelfish successfully.",
        "Discus fish care essentials.",
        "Oscar fish tank setup guide.",
        "Rainbowfish species overview.",
        "Gourami care and behavior guide.",
        "Barb species and care information.",
        "Catfish varieties for aquariums.",
        "Breeding livebearer fish.",
        "Killifish care and maintenance.",
        "Pufferfish species guide.",
        "Eel species for home aquariums.",
        "Stingray care in large tanks.",
        "Advanced aquascaping techniques.",
      ];

      const youtubeVideoIds = [
        "dQw4w9WgXcQ", "jNQXAC9IVRw", "kJQP7kiw5Fk", "9bZkp7q19f0",
        "L_jWHffIx5E", "fJ9rUzIMcZQ", "ZbZSe6N_BXs", "C-u5WLJ9Yk4",
        "rVeMiVU77wo", "6n3pFFPSlW4", "kJQP7kiw5Fk", "9bZkp7q19f0",
        "L_jWHffIx5E", "fJ9rUzIMcZQ", "ZbZSe6N_BXs", "C-u5WLJ9Yk4",
        "rVeMiVU77wo", "6n3pFFPSlW4", "dQw4w9WgXcQ", "jNQXAC9IVRw",
        "kJQP7kiw5Fk", "9bZkp7q19f0", "L_jWHffIx5E", "fJ9rUzIMcZQ",
        "ZbZSe6N_BXs", "C-u5WLJ9Yk4", "rVeMiVU77wo", "6n3pFFPSlW4",
        "dQw4w9WgXcQ", "jNQXAC9IVRw", "kJQP7kiw5Fk", "9bZkp7q19f0",
        "L_jWHffIx5E", "fJ9rUzIMcZQ", "ZbZSe6N_BXs", "C-u5WLJ9Yk4",
        "rVeMiVU77wo", "6n3pFFPSlW4", "dQw4w9WgXcQ", "jNQXAC9IVRw",
        "kJQP7kiw5Fk", "9bZkp7q19f0", "L_jWHffIx5E", "fJ9rUzIMcZQ",
        "ZbZSe6N_BXs", "C-u5WLJ9Yk4", "rVeMiVU77wo", "6n3pFFPSlW4",
      ];

      const categories = [
        "Freshwater", "Water Chemistry", "Feeding", "Filtration",
        "Substrate", "Lighting", "Diseases", "Cycling", "Aquascaping",
        "Temperature", "CO2", "Algae", "Breeding", "Quarantine",
        "Water Parameters", "Plants", "Tank Size", "Maintenance",
        "Equipment", "Community", "Saltwater", "Marine", "Coral",
        "Reef", "Marine Fish", "Nano", "Testing", "Emergency",
        "Maintenance", "Filtration", "Betta", "Goldfish", "Cichlid",
        "Shrimp", "Snails", "Pleco", "Tetra", "Angelfish", "Discus",
        "Oscar", "Rainbowfish", "Gourami", "Barb", "Catfish",
        "Livebearer", "Killifish", "Pufferfish", "Eel", "Stingray",
        "Advanced",
      ];

      for (let i = 0; i < videosToCreate; i++) {
        const titleIndex = i % videoTitles.length;
        const videoId = youtubeVideoIds[i % youtubeVideoIds.length];
        await VideoGuide.create({
          title: videoTitles[titleIndex],
          youtubeLink: `https://www.youtube.com/watch?v=${videoId}`,
          videoId: videoId,
          description: videoDescriptions[titleIndex],
          category: categories[titleIndex],
          submittedBy: testUser.id,
          status: "approved",
          isActive: true,
          viewCount: Math.floor(Math.random() * 10000) + 100,
          duration: `${Math.floor(Math.random() * 20) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        });
      }
      console.log(`✓ Created ${videosToCreate} video guides`);
    } else {
      console.log("✓ Video guides already have sufficient data");
    }

    console.log("\n✓ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
