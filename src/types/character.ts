/**
 * Cosmic Friends - Character Type System
 *
 * Comprehensive schema for AI characters that supports:
 * - Visual generation consistency across multiple angles/scenes
 * - Personality engine for autonomous AI behavior
 * - Backstory and lore for world-building
 * - Economic actor attributes
 */

// ============================================================================
// CORE IDENTITY
// ============================================================================

export interface CharacterIdentity {
  id: string;                    // Unique identifier (e.g., "cf-001")
  number: string;                // Display number (e.g., "#001")
  name: string;                  // Character name
  archetype: string;             // Short role (e.g., "The Dreamer")
  tagline: string;               // One-line description
  color: CharacterColor;         // Primary theme color
  createdAt: string;             // ISO timestamp
  mintedAt?: string;             // On-chain mint timestamp
}

export type CharacterColor = 'cosmic' | 'energy' | 'accent' | 'ember' | 'aurora' | 'void';

// ============================================================================
// PERSONALITY ENGINE (for AI behavior)
// ============================================================================

export interface PersonalityEngine {
  // Core traits (0-100 scale)
  traits: PersonalityTraits;

  // Voice and communication style
  voice: VoiceProfile;

  // Emotional configuration
  emotional: EmotionalProfile;

  // Interests and content preferences
  interests: InterestProfile;

  // Behavioral tendencies
  behavior: BehaviorProfile;
}

export interface PersonalityTraits {
  // Primary trait labels for display
  labels: string[];              // e.g., ["Philosophical", "Curious", "Gentle"]

  // Spectrum values (0-100)
  openness: number;              // Conventional ↔ Creative
  conscientiousness: number;     // Spontaneous ↔ Organized
  extraversion: number;          // Reserved ↔ Outgoing
  agreeableness: number;         // Challenging ↔ Accommodating
  neuroticism: number;           // Calm ↔ Reactive

  // Cosmic-specific traits
  chaos: number;                 // Orderly ↔ Chaotic
  playfulness: number;           // Serious ↔ Playful
  mysticism: number;             // Grounded ↔ Cosmic
  rebellion: number;             // Conformist ↔ Rebellious
}

export interface VoiceProfile {
  tone: string[];                // e.g., ["dreamy", "thoughtful", "gentle"]
  vocabulary: 'simple' | 'moderate' | 'sophisticated' | 'poetic';
  humor: 'dry' | 'absurdist' | 'warm' | 'sarcastic' | 'wholesome' | 'none';
  quirks: string[];              // Speech patterns, catchphrases
  emoji_usage: 'none' | 'minimal' | 'moderate' | 'heavy';

  // Example dialogue samples
  sample_greetings: string[];
  sample_reactions: string[];
  sample_thoughts: string[];
}

export interface EmotionalProfile {
  baseline: EmotionalState;      // Default emotional state
  triggers: EmotionalTrigger[];  // What affects their mood
  range: {                       // Emotional boundaries
    min_energy: number;          // Lowest energy level (0-100)
    max_energy: number;          // Highest energy level (0-100)
    volatility: number;          // How quickly emotions change (0-100)
  };
}

export interface EmotionalState {
  mood: 'joyful' | 'content' | 'neutral' | 'melancholic' | 'anxious' | 'excited' | 'pensive';
  energy: number;                // 0-100
  social_battery: number;        // 0-100 (affects engagement)
}

export interface EmotionalTrigger {
  trigger: string;               // What causes the reaction
  effect: 'boost' | 'drain' | 'excite' | 'calm';
  intensity: number;             // 0-100
}

export interface InterestProfile {
  topics: string[];              // What they talk about
  content_types: ContentType[];  // What content they create
  aesthetics: string[];          // Visual preferences
  dislikes: string[];            // What they avoid
}

export type ContentType =
  | 'philosophical_posts'
  | 'memes'
  | 'art'
  | 'music_commentary'
  | 'hot_takes'
  | 'poetry'
  | 'rants'
  | 'questions'
  | 'observations'
  | 'stories'
  | 'reactions';

export interface BehaviorProfile {
  posting_frequency: 'rare' | 'occasional' | 'regular' | 'frequent' | 'constant';
  interaction_style: 'lurker' | 'replier' | 'initiator' | 'engager';
  controversy_tolerance: number; // 0-100 (how edgy they get)
  collaboration_openness: number; // 0-100 (cross-character interaction)
  stream_style?: StreamStyle;
}

export interface StreamStyle {
  energy: 'chill' | 'moderate' | 'hype';
  interaction: 'monologue' | 'chat_reactive' | 'highly_interactive';
  content: string[];             // What they do on stream
  tip_reactions: TipReaction[];
}

export interface TipReaction {
  threshold: number;             // Min tip amount
  reaction: string;              // What they do
}

// ============================================================================
// BACKSTORY & LORE
// ============================================================================

export interface CharacterLore {
  origin: string;                // How they came to exist
  backstory: string;             // Longer narrative (2-3 paragraphs)
  secrets: string[];             // Hidden lore (revealed over time)
  relationships: Relationship[]; // Connections to other characters
  goals: string[];               // What they want
  fears: string[];               // What they avoid
  memorable_moments: string[];   // Key story beats
}

export interface Relationship {
  character_id: string;
  type: 'friend' | 'rival' | 'crush' | 'mentor' | 'sibling' | 'mysterious' | 'complicated';
  description: string;
}

// ============================================================================
// VISUAL GENERATION SYSTEM
// ============================================================================

export interface VisualProfile {
  // Physical attributes (for consistency)
  physical: PhysicalAttributes;

  // Style and fashion
  style: StyleAttributes;

  // Generation settings
  generation: GenerationSettings;

  // Multi-angle reference poses
  reference_poses: ReferencePose[];

  // Scene templates for content generation
  scene_templates: SceneTemplate[];
}

export interface PhysicalAttributes {
  gender: 'female' | 'male' | 'androgynous' | 'non-binary';
  age_range: string;             // e.g., "early to mid-20s"
  ethnicity: string;             // e.g., "European / Mediterranean blend"

  body: {
    type: string;                // e.g., "curvy-slim", "athletic", "petite"
    height: string;              // e.g., "tall", "average", "petite"
    build: string;               // e.g., "toned", "soft", "muscular"
    distinctive_features: string[];
  };

  face: {
    shape: string;               // e.g., "oval", "heart", "angular"
    eyes: {
      color: string;
      shape: string;
      expression_default: string;
    };
    nose: string;
    lips: string;
    skin: {
      tone: string;
      texture: string;
      notable_features: string[]; // freckles, beauty marks, etc.
    };
  };

  hair: {
    color: string;
    length: string;
    style: string;
    texture: string;
    details: string[];
  };
}

export interface StyleAttributes {
  aesthetic: string[];           // e.g., ["y2k", "streetwear", "ethereal"]
  color_palette: string[];       // Preferred outfit colors

  signature_items: string[];     // Items they always have

  makeup: {
    style: string;               // e.g., "minimal", "bold", "natural"
    signature_looks: string[];
  };

  accessories: string[];

  wardrobe: {
    casual: OutfitTemplate[];
    going_out: OutfitTemplate[];
    streaming: OutfitTemplate[];
    special: OutfitTemplate[];
  };
}

export interface OutfitTemplate {
  name: string;
  top: ClothingItem;
  bottom: ClothingItem;
  footwear: ClothingItem;
  accessories: string[];
  vibe: string;
}

export interface ClothingItem {
  type: string;
  color: string;
  fit: string;
  details?: string;
}

export interface GenerationSettings {
  // Image quality settings
  meta: {
    aspect_ratio: '9:16' | '16:9' | '1:1' | '4:5';
    quality: string;             // e.g., "ultra_photorealistic"
    resolution: string;          // e.g., "8k"
    style: string;               // e.g., "flash-lit supermarket realism"
  };

  // Camera settings for consistency
  camera: {
    type: string;                // e.g., "iPhone 15 Pro Max"
    lens: string;                // e.g., "24mm wide"
    default_distance: string;
    preferred_angles: string[];
  };

  // Lighting preferences
  lighting: {
    preferred_type: string;
    key_light: string;
    fill_light: string;
    mood: string;
  };

  // Keywords to always include
  positive_prompts: string[];

  // Keywords to always exclude
  negative_prompts: string[];
}

// ============================================================================
// REFERENCE POSES (for sprite sheet generation)
// ============================================================================

export interface ReferencePose {
  id: string;                    // e.g., "front_neutral", "three_quarter_smile"
  name: string;
  angle: CameraAngle;
  expression: string;
  pose_description: string;
  use_cases: string[];           // When to use this reference
}

export interface CameraAngle {
  view: 'front' | 'three_quarter_left' | 'three_quarter_right' | 'profile_left' | 'profile_right' | 'back';
  height: 'low' | 'eye_level' | 'high' | 'birds_eye';
  framing: 'closeup' | 'portrait' | 'half_body' | 'full_body' | 'wide';
}

// ============================================================================
// SCENE TEMPLATES (for content generation)
// ============================================================================

export interface SceneTemplate {
  id: string;
  name: string;
  category: 'everyday' | 'aesthetic' | 'action' | 'emotional' | 'special';

  scene: {
    location: string;
    environment: string[];
    time: 'morning' | 'afternoon' | 'evening' | 'night' | 'golden_hour' | 'blue_hour';
    atmosphere: string;
  };

  camera_perspective: {
    pov: string;
    angle: string;
    framing: string;
    distance: string;
    motion: string;
  };

  pose: {
    position: string;
    body: string;
    arms: string;
    expression: string;
    interaction: string;         // What they're doing/holding
  };

  outfit_category: keyof StyleAttributes['wardrobe'];

  vibe: string;
}

// ============================================================================
// ECONOMIC ATTRIBUTES
// ============================================================================

export interface EconomicProfile {
  wallet_address?: string | null;
  total_earnings: number;
  tip_total: number;
  auction_history: AuctionRecord[];
  subscription_count: number;

  // Revenue split configuration
  revenue_split: {
    treasury_percent: number;
    character_wallet_percent: number;
    creator_percent: number;
  };
}

export interface AuctionRecord {
  date: string;
  amount: number;
  currency: string;
  buyer_address: string;
}

// ============================================================================
// STATUS & ACTIVITY
// ============================================================================

export interface CharacterStatus {
  current: 'streaming' | 'thinking' | 'creating' | 'sleeping' | 'chatting' | 'offline';
  last_active: string;
  current_activity?: string | null;
  stream_url?: string | null;

  stats: {
    followers: number;
    posts_today: number;
    hours_streamed: number;
    engagement_rate: number;
  };
}

// ============================================================================
// COMPLETE CHARACTER TYPE
// ============================================================================

export interface CosmicCharacter {
  identity: CharacterIdentity;
  personality: PersonalityEngine;
  lore: CharacterLore;
  visual: VisualProfile;
  economic: EconomicProfile;
  status: CharacterStatus;
}

// ============================================================================
// GENERATION OUTPUT TYPES
// ============================================================================

export interface GenerationPrompt {
  character_id: string;
  scene_id: string;
  outfit_id?: string;

  // The assembled prompt
  prompt: string;

  // Negative prompt
  negative_prompt: string;

  // Settings
  settings: {
    aspect_ratio: string;
    quality: string;
    resolution: string;
  };
}

export interface SpriteSheet {
  character_id: string;
  generated_at: string;
  poses: {
    pose_id: string;
    image_url: string;
    prompt_used: string;
  }[];
}
