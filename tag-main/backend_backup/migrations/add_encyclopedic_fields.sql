
-- Migration to add encyclopedic fields to SpeciesDictionary
ALTER TABLE "SpeciesDictionary" 
ADD COLUMN IF NOT EXISTS "lifespan_years" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "social_needs" TEXT,
ADD COLUMN IF NOT EXISTS "filtration_requirement" VARCHAR(50),
ADD COLUMN IF NOT EXISTS "common_diseases" JSONB,
ADD COLUMN IF NOT EXISTS "varieties" TEXT,
ADD COLUMN IF NOT EXISTS "bioload" VARCHAR(50),
ADD COLUMN IF NOT EXISTS "recommended_substrate" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "plant_safety" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "breeding_triggers" TEXT,
ADD COLUMN IF NOT EXISTS "spawning_process" TEXT,
ADD COLUMN IF NOT EXISTS "tank_mates" TEXT,
ADD COLUMN IF NOT EXISTS "common_myths" TEXT,
ADD COLUMN IF NOT EXISTS "fry_development" JSONB;
