import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  createEmptyObservation,
  createLocalDidacticProfile,
  createLearningCheckObservation,
  getAnonymousProfiles,
  getAdaptiveNextStepForProfile,
  getLocalObservationControlSummary,
  getCuratedObservationTasksForProfile,
  getLocalReadingSeriesForProfile,
  getAdaptivePlacementSummary,
  getCuratedDailyReadingPath,
  getDailyPathChoices,
  getDailyReadingPath,
  getGuidedReadingChain,
  getGuidedReadingTransitionCue,
  getTaskDevelopmentProfile,
  getWritingBridgeForTask,
  getLearningCheckDailyPath,
  getChildOrientationSteps,
  getLearningTasks,
  getProfileSafeDailyPath,
  getTaskRequirementCoverageSummary,
  getProfileSafeWortpostPath,
  getProfileWordFamilyMaterialPacks,
  getAvailableMiniJourneyCards,
  getMiniJourneyReadinessOverview,
  getMiniJourneyPrepActions,
  getMiniJourneyPrepSequence,
  getMiniJourneyTeacherRationales,
  getMamaFamilyMiniJourney,
  getSofaFamilyMiniJourney,
  getTasseFamilyMiniJourney,
  getBallFamilyMiniJourney,
  getBusFamilyMiniJourney,
  getBuchFamilyMiniJourney,
  getApfelFamilyMiniJourney,
  getTischFamilyMiniJourney,
  getHeftFamilyMiniJourney,
  getWordFamilyMiniJourney,
  getObjectFamilyMiniSlice,
  getWortpostDevelopmentStage,
  getWortpostPresetPreview,
  getWortpostProfilePresets,
  wortpostProfileControlUnits,
  getWortpostSentenceBridge,
  getReducedChoices,
  getReducedStoryChoices,
  getStoryPaths,
  getStudentTaskLabel,
  getTeacherDailyPathSuggestion,
  getTeacherDevelopmentOverview,
  getTeacherWordFamilyReviewSlices,
  getTeacherSummary,
  getAlpha73Inventory,
  getTwoCardPilotPath,
  getTwoCardPilotSupport,
  maxDailyPathCards,
  normalizeSupportState,
  profileBuilderOptions,
  readingProfileExamples,
  recordLearningAction,
  supportOptions,
} from './lesewerk-content.mjs';

type Profile = ReturnType<typeof getAnonymousProfiles>[number];
type Task = ReturnType<typeof getLearningTasks>[number];
type Story = ReturnType<typeof getStoryPaths>[number];
type DailyPathItem = NonNullable<ReturnType<typeof getDailyReadingPath>[number]>;
type DailyPathChoice = ReturnType<typeof getDailyPathChoices>[number];
type SupportKey = (typeof supportOptions)[number]['id'];
type SupportState = Partial<Record<SupportKey, boolean>>;
type Observation = {
  taskPath: string[];
  storyPath: string[];
  storyEvidence: { storyId: string; title: string; answer: string; nextStep: string }[];
  lastTaskId?: string;
  lastChoice?: string;
  selectedSupports: string[];
  choices: string[];
  observationCount: number;
};
type WortpostLearningRecord = {
  word: string;
  answer: string;
  matched: boolean;
  supportLabels: string[];
  reducedChoices: boolean;
  visibleHelp: string;
  helpDefaults: string[];
  layerSummary: string;
  roundLabel: string;
  pathReason: string;
  pathSummary: string;
  developmentStageLabel: string;
  developmentStageReason: string;
  developmentStageNextStep: string;
  sentenceBridge?: string;
};
type WortpostHelpKey = 'silben' | 'kleine-auswahl' | 'vormachen';
type WortpostHelpDefaults = Record<WortpostHelpKey, boolean>;
type ChildPhase = 'task' | 'feedback' | 'finish';
type ReadingMode = 'task' | 'story';
type SuggestionAction = 'idle' | 'applied' | 'ignored';
type DemoProfileKey = 'profileMA' | 'profileMASOF' | 'profileLAM';
type LocalSupportKey = 'imageHelp' | 'gestureHint' | 'reducedChoices' | 'teacherReadAloud' | 'repeat';
type LocalReadinessKey = 'sentence' | 'story' | 'writingBridge';
type AccessFocus = (typeof profileBuilderOptions.accessFocus)[number]['id'];
type LearningCheckKey = 'imageSupportUsed' | 'gestureOrReadAloudUsed' | 'reducedChoicesUsed' | 'repeatUsed' | 'syllableStepComfortable' | 'wordStepComfortable' | 'sentenceOrStoryReady' | 'writingBridgeReady';
type ReadingSeries = ReturnType<typeof getLocalReadingSeriesForProfile>[number];
type WordFamilyJourneyAnchor = 'Mama' | 'Sofa' | 'Tasse' | 'Ball' | 'Bus' | 'Buch' | 'Lama' | 'Apfel' | 'Tisch' | 'Heft';
type MiniJourneyPrepAnchor = 'Sofa' | 'Tasse' | 'Lama' | 'Tisch';
type MiniJourneyStoryChoice = { text: string; symbol: WordFamilyJourneyAnchor };

const storageKey = 'lesewerk-v1-demo-profile';

function MiniJourneySymbolScene({ anchorWord, className = '' }: { anchorWord: WordFamilyJourneyAnchor; className?: string }) {
  const symbolClassName = `mini-journey-symbol mini-journey-symbol--${anchorWord.toLowerCase()}${className ? ` ${className}` : ''}`;

  if (anchorWord === 'Tasse') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-cup-bowl" />
        <span className="mini-journey-cup-handle" />
        <span className="mini-journey-cup-saucer" />
        <span className="mini-journey-cup-steam mini-journey-cup-steam--left" />
        <span className="mini-journey-cup-steam mini-journey-cup-steam--right" />
      </div>
    );
  }

  if (anchorWord === 'Ball') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-ball-core" />
        <span className="mini-journey-ball-shine" />
      </div>
    );
  }

  if (anchorWord === 'Bus') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-bus-body" />
        <span className="mini-journey-bus-window mini-journey-bus-window--front" />
        <span className="mini-journey-bus-window mini-journey-bus-window--back" />
        <span className="mini-journey-bus-wheel mini-journey-bus-wheel--front" />
        <span className="mini-journey-bus-wheel mini-journey-bus-wheel--back" />
      </div>
    );
  }

  if (anchorWord === 'Buch') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-book-cover" />
        <span className="mini-journey-book-page mini-journey-book-page--left" />
        <span className="mini-journey-book-page mini-journey-book-page--right" />
        <span className="mini-journey-book-spine" />
      </div>
    );
  }

  if (anchorWord === 'Sofa') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-sofa-back" />
        <span className="mini-journey-sofa-seat" />
        <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--left" />
        <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--right" />
      </div>
    );
  }

  if (anchorWord === 'Lama') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-lama-body" />
        <span className="mini-journey-lama-neck" />
        <span className="mini-journey-lama-head" />
        <span className="mini-journey-lama-ear mini-journey-lama-ear--front" />
        <span className="mini-journey-lama-ear mini-journey-lama-ear--back" />
      </div>
    );
  }

  if (anchorWord === 'Apfel') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-apple-body" />
        <span className="mini-journey-apple-leaf" />
        <span className="mini-journey-apple-shine" />
      </div>
    );
  }

  if (anchorWord === 'Tisch') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-table-top" />
        <span className="mini-journey-table-leg mini-journey-table-leg--left" />
        <span className="mini-journey-table-leg mini-journey-table-leg--right" />
      </div>
    );
  }

  if (anchorWord === 'Heft') {
    return (
      <div className={symbolClassName} aria-hidden="true">
        <span className="mini-journey-heft-cover" />
        <span className="mini-journey-heft-line mini-journey-heft-line--top" />
        <span className="mini-journey-heft-line mini-journey-heft-line--middle" />
        <span className="mini-journey-heft-label" />
      </div>
    );
  }

  return (
    <div className={symbolClassName} aria-hidden="true">
      <span className="mini-journey-mama-house" />
      <span className="mini-journey-mama-heart" />
    </div>
  );
}

const leseMissionSymbolKeys = new Set([
  'stift',
  'heft',
  'buch',
  'ball',
  'bus',
  'sofa',
  'tasse',
  'tisch',
  'apfel',
  'brot',
  'banane',
  'wasser',
  'hand',
  'schuh',
  'jacke',
]);

function getLeseMissionSymbolKey(word = '') {
  const normalized = word
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z]/g, '');

  return leseMissionSymbolKeys.has(normalized) ? normalized : 'generic';
}

function LeseMissionSymbolScene({ word, hint }: { word?: string; hint?: string }) {
  const symbolKey = getLeseMissionSymbolKey(word);
  const label = hint ? hint.replace(/^Bildplatzhalter:\s*/i, '') : word ? `Symbol zu ${word}` : 'Symbol';

  return (
    <div className={`lese-mission-local-symbol lese-mission-local-symbol--${symbolKey}`} aria-hidden="true">
      <span className="lese-mission-symbol-shape shape-one" />
      <span className="lese-mission-symbol-shape shape-two" />
      <span className="lese-mission-symbol-shape shape-three" />
      <span className="lese-mission-symbol-shape shape-four" />
      <span className="lese-mission-symbol-caption">{label}</span>
    </div>
  );
}

const teacherPreviewProfiles: { key: DemoProfileKey; label: string }[] = [
  { key: 'profileMA', label: 'M+A' },
  { key: 'profileMASOF', label: 'M+A+S+O+F' },
  { key: 'profileLAM', label: 'L+A+M' },
];

const profileSafeModeLabels: Record<string, string> = {
  'teacher-led': 'Gemeinsam lesen',
  'reduced-choice': 'Reduzierte Auswahl',
  'full-choice': 'Freie Auswahl',
  blocked: 'Heute auslassen',
};

function getProfileSafeModeLabel(mode: string) {
  return profileSafeModeLabels[mode] ?? 'Gemeinsam prüfen';
}

function readStoredProfile(profiles: Profile[]): Profile {
  if (typeof window === 'undefined') return profiles[0];
  const storedId = window.localStorage.getItem(storageKey);
  return profiles.find((profile) => profile.id === storedId) ?? profiles[0];
}

type MaterialkorbRecommendation = {
  preset: 'einfach' | 'silbenfokus' | 'satzaufbau' | 'ge-sehr-leicht';
  headline: string;
  reason: string;
  nextStep: string;
};

function getMaterialkorbRecommendation(items: any[]): MaterialkorbRecommendation {
  const count = items.length;
  const advancedCount = items.filter((item) => item.isAdvanced || item.complexUnits.length > 0).length;
  const syllableCount = items.filter((item) => (item.syllablesText || '').trim().length > 0).length;
  const simpleCount = count - advancedCount;
  const complexUnitCount = items.reduce((sum, item) => sum + item.complexUnits.length, 0);
  const domainCount = new Set(items.map((item) => item.domain)).size;

  if (count === 0) {
    return {
      preset: 'einfach',
      headline: 'Noch keine Empfehlung',
      reason: 'Sobald Karten ausgewählt sind, kann ich eine ruhige Empfehlung geben.',
      nextStep: 'Erst Karten auswählen, dann passt die Empfehlung zur Auswahl.',
    };
  }

  if (advancedCount >= Math.max(2, Math.ceil(count / 2)) || complexUnitCount >= 3 || (count >= 4 && advancedCount >= 2)) {
    return {
      preset: 'ge-sehr-leicht',
      headline: 'Sehr ruhiger Einstieg',
      reason: 'Mehrere Karten brauchen deutlich mehr Begleitung oder enthalten auffällige Stellen.',
      nextStep: 'Mini-Förderreihe nutzen und Schritt für Schritt gemeinsam lesen.',
    };
  }

  if (syllableCount >= Math.max(2, Math.ceil(count / 2)) && advancedCount <= 1 && complexUnitCount <= 1) {
    return {
      preset: 'silbenfokus',
      headline: 'Silbenfokus passt gut',
      reason: 'Die Auswahl enthält genug Silbenmaterial für gemeinsames Klatschen und Lesen.',
      nextStep: 'Silbenkarte wählen und zuerst die Silben gemeinsam sichtbar machen.',
    };
  }

  if (simpleCount >= Math.max(2, Math.ceil(count / 2)) && advancedCount === 0) {
    return {
      preset: 'einfach',
      headline: 'Einfacher Einstieg',
      reason: 'Die Auswahl wirkt überwiegend leicht und klar lesbar.',
      nextStep: 'Wortkarte mit Bildfeld verwenden und ruhig beim Wort bleiben.',
    };
  }

  if (domainCount >= 2 || count >= 3 || advancedCount > 0) {
    return {
      preset: 'satzaufbau',
      headline: 'Nächster Sprachschritt',
      reason: 'Die Auswahl eignet sich gut, um vom Wort zum Satz zu gehen.',
      nextStep: 'Satzstarterkarte nutzen und einen einfachen Satz gemeinsam beginnen.',
    };
  }

  return {
    preset: 'einfach',
    headline: 'Ruhiger Standard',
    reason: 'Die Auswahl ist klein und gut für einen klaren Einstieg geeignet.',
    nextStep: 'Mit einer Wortkarte starten und dann erst weitergehen.',
  };
}

export default function App() {
  const arrivalCue = useMemo(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const source = params.get('source');
    if (source === 'schulwerkstatt') {
      return { source, focus: params.get('focus'), view: params.get('view') };
    }
    return null;
  }, []);

  const profiles = useMemo(() => getAnonymousProfiles(), []);
  const tasks = useMemo(() => getLearningTasks(), []);
  const stories = useMemo(() => getStoryPaths(), []);
  const dailyPathChoices = useMemo(() => getDailyPathChoices(tasks, stories) as DailyPathChoice[], [tasks, stories]);
  const twoCardPilotPath = useMemo(() => getTwoCardPilotPath(tasks) as DailyPathItem[], [tasks]);
  const guidedReadingChain = useMemo(() => getGuidedReadingChain(tasks, stories), [tasks, stories]);
  const [mamaStepIndex, setMamaStepIndex] = useState(0);
  const [selectedDailyPathIds, setSelectedDailyPathIds] = useState<string[]>([]);
  const [pilotMode, setPilotMode] = useState(false);
  const [pilotFocusStarted, setPilotFocusStarted] = useState(false);
  const [guidedFocusMode, setGuidedFocusMode] = useState(false);
  const [guidedFocusStarted, setGuidedFocusStarted] = useState(false);
  const [sequenceMode, setSequenceMode] = useState(false);
  const [sequenceFocusStarted, setSequenceFocusStarted] = useState(false);
  const [sequenceCardIndex, setSequenceCardIndex] = useState(0);
  const [wortpostMode, setWortpostMode] = useState(false);
  const [wortpostFocusStarted, setWortpostFocusStarted] = useState(false);
  const [wortpostCardIndex, setWortpostCardIndex] = useState(0);
  const [wortpostAnswer, setWortpostAnswer] = useState<string | null>(null);
  const [wortpostVisibleHelp, setWortpostVisibleHelp] = useState<WortpostHelpKey | null>(null);
  const [wortpostHelpDefaults, setWortpostHelpDefaults] = useState<WortpostHelpDefaults>({ silben: true, 'kleine-auswahl': true, vormachen: false });
  const [wortpostLearningRecord, setWortpostLearningRecord] = useState<WortpostLearningRecord | null>(null);
  const [mamaJourneyMode, setMamaJourneyMode] = useState(false);
  const [miniJourneyPrepMode, setMiniJourneyPrepMode] = useState(false);
  const [objectFamilyMomentMode, setObjectFamilyMomentMode] = useState(false);
  const [activeMiniJourneyPrepAnchor, setActiveMiniJourneyPrepAnchor] = useState<MiniJourneyPrepAnchor>('Sofa');
  const [miniJourneyPrepStepIndex, setMiniJourneyPrepStepIndex] = useState(0);
  const [activeWordFamilyJourneyAnchor, setActiveWordFamilyJourneyAnchor] = useState<WordFamilyJourneyAnchor>('Mama');
  const [materialkorbSelectedIds, setMaterialkorbSelectedIds] = useState<string[]>([]);
  const [alpha73FilterDomain, setAlpha73FilterDomain] = useState<string | null>(null);
  const [alpha73FilterGate, setAlpha73FilterGate] = useState<string | null>(null);
  const alpha73Inventory = useMemo(() => getAlpha73Inventory(), []);
  const materialkorbItems = useMemo(() => {
    return alpha73Inventory.filter(item => materialkorbSelectedIds.includes(item.id));
  }, [alpha73Inventory, materialkorbSelectedIds]);
  const leseMissionItems = useMemo(() => materialkorbItems.slice(0, 3), [materialkorbItems]);
  const [leseMissionMode, setLeseMissionMode] = useState(false);
  const [leseMissionStarted, setLeseMissionStarted] = useState(false);
  const [leseMissionStep, setLeseMissionStep] = useState<'start' | 'word' | 'action' | 'finish'>('start');
  const [leseMissionItemIndex, setLeseMissionItemIndex] = useState(0);
  const [childHomeStarted, setChildHomeStarted] = useState(false);

  const filteredAlpha73 = useMemo(() => {
    return alpha73Inventory.filter(item => {
      if (alpha73FilterDomain && item.domain !== alpha73FilterDomain) return false;
      if (alpha73FilterGate && item.gate !== alpha73FilterGate) return false;
      return true;
    });
  }, [alpha73Inventory, alpha73FilterDomain, alpha73FilterGate]);

  const toggleMaterialkorb = (id: string) => {
    setMaterialkorbSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const alpha73Domains = useMemo(() => [...new Set(alpha73Inventory.map(item => item.domain))], [alpha73Inventory]);
  const alpha73Gates = useMemo(() => [...new Set(alpha73Inventory.map(item => item.gate))], [alpha73Inventory]);
  const [mamaJourneyStarted, setMamaJourneyStarted] = useState(false);
  const [mamaJourneyStationIndex, setMamaJourneyStationIndex] = useState(0);
  const [mamaJourneyHelpActive, setMamaJourneyHelpActive] = useState(false);
  const [pilotCardIndex, setPilotCardIndex] = useState(0);
  const [suggestionAction, setSuggestionAction] = useState<SuggestionAction>('idle');
  const dailyReadingPath = useMemo(() => getCuratedDailyReadingPath(selectedDailyPathIds, tasks, stories) as DailyPathItem[], [selectedDailyPathIds, tasks, stories]);
  const sequenceReadingPath = useMemo(() => {
    const preparedPath = dailyReadingPath.slice(0, maxDailyPathCards);
    if (preparedPath.length > 0) return preparedPath;
    return tasks.slice(0, maxDailyPathCards).map((task, index) => ({
      id: `sequence-fallback-${task.id}`,
      kind: 'task',
      taskId: task.id,
      label: task.word,
      helper: index === 0 ? 'Erste Karte' : `${index + 1}. Karte`,
    })) as DailyPathItem[];
  }, [dailyReadingPath, tasks]);
  const currentReadingPath = pilotMode ? twoCardPilotPath : sequenceMode ? sequenceReadingPath : dailyReadingPath;
  const [selectedProfile, setSelectedProfile] = useState<Profile>(() => readStoredProfile(profiles));
  const [support, setSupport] = useState<SupportState>({ syllableColors: true });
  const [activeTaskId, setActiveTaskId] = useState(tasks[0].id);
  const [activeStoryId, setActiveStoryId] = useState(stories[0].id);
  const [readingMode, setReadingMode] = useState<ReadingMode>('task');
  const [mode, setMode] = useState<'child' | 'teacher'>('child');
  const [phase, setPhase] = useState<ChildPhase>('task');
  const [teacherPreviewProfileKey, setTeacherPreviewProfileKey] = useState<DemoProfileKey>('profileMA');
  const [localKnownGraphemes, setLocalKnownGraphemes] = useState<string[]>(['m', 'a']);
  const [localKnownSyllables, setLocalKnownSyllables] = useState<string[]>(['ma']);
  const [localSupportSettings, setLocalSupportSettings] = useState<Partial<Record<LocalSupportKey, boolean>>>({ imageHelp: true, reducedChoices: true });
  const [localReadiness, setLocalReadiness] = useState<Partial<Record<LocalReadinessKey, boolean>>>({ sentence: true, story: false, writingBridge: false });
  const [localAccessFocus, setLocalAccessFocus] = useState<AccessFocus>('syllable');
  const [learningCheckInput, setLearningCheckInput] = useState<Partial<Record<LearningCheckKey, boolean>>>({ imageSupportUsed: true, reducedChoicesUsed: true });
  const [selectedSeriesId, setSelectedSeriesId] = useState('arrival-recognition');
  const [observation, setObservation] = useState<Observation>(() => createEmptyObservation() as Observation);

  const supportState = normalizeSupportState(support);
  const visibleTasks = getReducedChoices(tasks, activeTaskId, supportState.reduceChoices);
  const visibleStories = getReducedStoryChoices(stories, activeStoryId, supportState.reduceChoices);
  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0];
  const activeStory = stories.find((story) => story.id === activeStoryId) ?? stories[0];
  const activeSequenceItem = sequenceReadingPath[sequenceCardIndex] ?? sequenceReadingPath[0];
  const teacherSummary = getTeacherSummary({ profileLabel: selectedProfile.label, support, observation: observation as any });
  const adaptivePlacement = getAdaptivePlacementSummary({ support, observation: observation as any });
  const teacherDailyPathSuggestion = getTeacherDailyPathSuggestion({
    support,
    observation: observation as any,
    selectedDailyPathIds: selectedDailyPathIds as any,
    tasks,
    stories,
  } as any);
  const teacherPreviewProfile = readingProfileExamples[teacherPreviewProfileKey];
  const localDidacticProfile = useMemo(
    () => createLocalDidacticProfile({
      knownGraphemes: localKnownGraphemes,
      knownSyllables: localKnownSyllables,
      supportSettings: localSupportSettings,
      readiness: {
        sentence: localReadiness.sentence ? 'supported' : 'later',
        story: localReadiness.story ? 'supported' : 'later',
        writingBridge: localReadiness.writingBridge ? 'optional' : 'later',
      },
      accessFocus: localAccessFocus,
    }),
    [localKnownGraphemes, localKnownSyllables, localSupportSettings, localReadiness, localAccessFocus],
  );
  const localAdaptiveNextStep = useMemo(
    () => getAdaptiveNextStepForProfile(localDidacticProfile, { minimumChoices: 1 }),
    [localDidacticProfile],
  );
  const localObservationSummary = useMemo(
    () => getLocalObservationControlSummary(localDidacticProfile, localAdaptiveNextStep),
    [localDidacticProfile, localAdaptiveNextStep],
  );
  const teacherDevelopmentOverview = useMemo(
    () => getTeacherDevelopmentOverview(localDidacticProfile, { minimumChoices: 1 }),
    [localDidacticProfile],
  );
  const localCuratedObservationTasks = useMemo(
    () => getCuratedObservationTasksForProfile(localDidacticProfile),
    [localDidacticProfile],
  );
  const localReadingSeries = useMemo(
    () => getLocalReadingSeriesForProfile(localDidacticProfile, localAdaptiveNextStep),
    [localDidacticProfile, localAdaptiveNextStep],
  );
  const teacherWordFamilyReviewSlices = useMemo(() => getTeacherWordFamilyReviewSlices(), []);
  const wortpostProfilePresets = useMemo(() => getWortpostProfilePresets(), []);
  const wortpostPresetPreviews = useMemo(
    () => wortpostProfilePresets.map((preset) => getWortpostPresetPreview(localDidacticProfile, preset, tasks)),
    [localDidacticProfile, tasks, wortpostProfilePresets],
  );
  const selectedReadingSeries = localReadingSeries.find((series: ReadingSeries) => series.id === selectedSeriesId) ?? localReadingSeries[0];
  const wortpostProfilePath = useMemo(
    () => getProfileSafeWortpostPath(localDidacticProfile, tasks, { maxCards: 3, minimumChoices: 1 }),
    [localDidacticProfile, tasks],
  );
  const wordFamilyMaterialPacks = useMemo(
    () => getProfileWordFamilyMaterialPacks(localDidacticProfile, tasks, { maxPacks: 3 }),
    [localDidacticProfile, tasks],
  );
  const availableMiniJourneyCards = useMemo(
    () => getAvailableMiniJourneyCards(localDidacticProfile, tasks, { maxCards: 3 }),
    [localDidacticProfile, tasks],
  );
  const miniJourneyReadinessOverview = useMemo(
    () => getMiniJourneyReadinessOverview(localDidacticProfile, tasks),
    [localDidacticProfile, tasks],
  );
  const miniJourneyPrepActions = useMemo(
    () => getMiniJourneyPrepActions(localDidacticProfile, tasks),
    [localDidacticProfile, tasks],
  );
  const miniJourneyTeacherRationales = useMemo(() => getMiniJourneyTeacherRationales(), []);
  const objectFamilyMiniSlice = useMemo(() => getObjectFamilyMiniSlice(), []);
  const activeMiniJourneyPrep = useMemo(
    () => getMiniJourneyPrepSequence(activeMiniJourneyPrepAnchor),
    [activeMiniJourneyPrepAnchor],
  );
  const mamaFamilyMiniJourney = useMemo(
    () => getMamaFamilyMiniJourney(localDidacticProfile, tasks),
    [localDidacticProfile, tasks],
  );
  const sofaFamilyMiniJourney = useMemo(
    () => getSofaFamilyMiniJourney(localDidacticProfile, tasks),
    [localDidacticProfile, tasks],
  );
  const tasseFamilyMiniJourney = useMemo(
    () => getTasseFamilyMiniJourney(localDidacticProfile, tasks),
    [localDidacticProfile, tasks],
  );
  const activeWordFamilyMiniJourney = useMemo(
    () => getWordFamilyMiniJourney(localDidacticProfile, tasks, { anchorWord: activeWordFamilyJourneyAnchor, maxPacks: 4 }),
    [activeWordFamilyJourneyAnchor, localDidacticProfile, tasks],
  );
  const activeWordFamilyJourneyTitle = `${activeWordFamilyJourneyAnchor}-Mini-Reise`;
  const wortpostDevelopmentStage = useMemo(
    () => wortpostProfilePath.developmentStage ?? getWortpostDevelopmentStage(localDidacticProfile),
    [localDidacticProfile, wortpostProfilePath],
  );
  const wortpostTasks = useMemo(() => {
    const selected = wortpostProfilePath.cards
      .map((card) => tasks.find((task) => task.id === card.taskId))
      .filter(Boolean) as Task[];
    if (selected.length >= 3) return selected.slice(0, 3);
    const fallbackWords = ['Ball', 'Tasse', 'Mond'];
    const fallback = fallbackWords.map((word) => tasks.find((task) => task.word === word)).filter(Boolean) as Task[];
    return fallback.length >= 3 ? fallback : tasks.slice(0, 3);
  }, [tasks, wortpostProfilePath]);
  const learningCheckDailyPath = useMemo(
    () => getLearningCheckDailyPath(createLearningCheckObservation(learningCheckInput), { minimumChoices: 1 }),
    [learningCheckInput],
  );
  const teacherPreviewDailyPath = useMemo(
    () => getProfileSafeDailyPath(teacherPreviewProfile, { minimumChoices: 1 }),
    [teacherPreviewProfile],
  );
  const coverageSummary = useMemo(
    () => getTaskRequirementCoverageSummary(teacherPreviewProfile, { minimumChoices: 1, sampleLimit: 5 }),
    [teacherPreviewProfile],
  );
  const coverageProfileFit = (coverageSummary as any).selectedProfileFit;
  const teacherPreviewBlockedTotal = teacherPreviewDailyPath.blockedTaskIds.length;
  const teacherPreviewBlockedText = teacherPreviewBlockedTotal > 0
    ? `${teacherPreviewDailyPath.blockedTaskIds.slice(0, 6).join(', ')}${teacherPreviewBlockedTotal > 6 ? ` und ${teacherPreviewBlockedTotal - 6} weitere` : ''}`
    : 'keine profilierte Aufgabe';
  const activeSupportLabels = teacherSummary.observedSupport.filter((label) => label !== 'noch keine Hilfe gewählt');
  const activeDevelopmentProfile = readingMode === 'task' ? getTaskDevelopmentProfile(activeTask.id) : undefined;
  const activeWritingBridge = readingMode === 'task' ? getWritingBridgeForTask(activeTask.id) : undefined;
  const childOrientationSteps = useMemo(() => getChildOrientationSteps(createLearningCheckObservation(learningCheckInput)), [learningCheckInput]);

  function chooseProfile(profile: Profile) {
    setSelectedProfile(profile);
    window.localStorage.setItem(storageKey, profile.id);
    setPhase('task');
  }

  function toggleSupport(key: SupportKey) {
    setSupport((current) => ({ ...current, [key]: !current[key] }));
    setPhase('task');
  }

  function chooseTask(taskId: string) {
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setActiveTaskId(taskId);
    setReadingMode('task');
    setPhase('task');
  }

  function chooseStory(storyId: string) {
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setActiveStoryId(storyId);
    setReadingMode('story');
    setPhase('task');
  }

  function chooseDailyPathItem(item: DailyPathItem) {
    if (pilotMode) {
      const nextPilotIndex = twoCardPilotPath.findIndex((pilotItem) => pilotItem.id === item.id);
      setPilotCardIndex(Math.max(0, nextPilotIndex));
    }
    if (item.kind === 'story') {
      chooseStory(item.storyId);
      return;
    }
    setActiveTaskId(item.taskId);
    setReadingMode('task');
    setPhase('task');
    if (item.kind === 'repeat') {
      setSupport((current) => ({ ...current, repeat: true }));
    }
  }

  function startTwoCardPilot() {
    const firstPilotCard = twoCardPilotPath[0];
    if (!firstPilotCard || firstPilotCard.kind === 'story') return;
    setChildHomeStarted(true);
    setPilotMode(true);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setSupport(getTwoCardPilotSupport());
    setActiveTaskId(firstPilotCard.taskId);
    setReadingMode('task');
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function startGuidedReadingPath() {
    if (guidedReadingChain.taskId) setActiveTaskId(guidedReadingChain.taskId);
    if (guidedReadingChain.storyId) setActiveStoryId(guidedReadingChain.storyId);
    setChildHomeStarted(true);
    setMamaStepIndex(0);
    setPilotMode(false);
    setPilotCardIndex(0);
    setGuidedFocusMode(true);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setGuidedFocusStarted(false);
    setSupport((current) => ({ ...current, imageHelp: true, syllableColors: true, reduceChoices: true }));
    setReadingMode('task');
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function startSequenceGame() {
    const firstSequenceCard = sequenceReadingPath[0];
    if (!firstSequenceCard) return;
    setChildHomeStarted(true);
    setSequenceMode(true);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setWortpostMode(false);
    setWortpostFocusStarted(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    if (firstSequenceCard.kind === 'story') {
      setActiveStoryId(firstSequenceCard.storyId);
      setReadingMode('story');
    } else {
      setActiveTaskId(firstSequenceCard.taskId);
      setReadingMode('task');
    }
    setSupport((current) => ({ ...current, imageHelp: true, syllableColors: true, reduceChoices: true }));
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function startWortpost() {
    const firstWortpostTask = wortpostTasks[0];
    if (!firstWortpostTask) return;
    setChildHomeStarted(true);
    setWortpostMode(true);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setWortpostFocusStarted(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    setWortpostVisibleHelp(null);
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setActiveTaskId(firstWortpostTask.id);
    setReadingMode('task');
    setSupport((current) => ({
      ...current,
      imageHelp: true,
      syllableColors: wortpostHelpDefaults.silben,
      reduceChoices: wortpostHelpDefaults['kleine-auswahl'],
      signHint: wortpostHelpDefaults.vormachen,
    }));
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function startMiniJourneyPrep(anchorWord: MiniJourneyPrepAnchor) {
    const prep = getMiniJourneyPrepSequence(anchorWord);
    if (prep.length === 0) return;
    setChildHomeStarted(true);
    setActiveMiniJourneyPrepAnchor(anchorWord);
    setMiniJourneyPrepMode(true);
    setObjectFamilyMomentMode(false);
    setMiniJourneyPrepStepIndex(0);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setWortpostMode(false);
    setWortpostFocusStarted(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    setSupport((current) => ({ ...current, imageHelp: true, syllableColors: true, reduceChoices: true }));
    setPhase('task');
    setMode('child');
  }

  function continueMiniJourneyPrep() {
    setMiniJourneyPrepStepIndex((current) => {
      if (current >= activeMiniJourneyPrep.length - 1) {
        setPhase('finish');
        return current;
      }
      return current + 1;
    });
  }

  function restartMiniJourneyPrepInFocus() {
    setMiniJourneyPrepStepIndex(0);
    setPhase('task');
  }

  function leaveMiniJourneyPrep() {
    setMiniJourneyPrepMode(false);
    setMiniJourneyPrepStepIndex(0);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function startObjectFamilyMiniMoment() {
    setChildHomeStarted(true);
    setObjectFamilyMomentMode(true);
    setMiniJourneyPrepMode(false);
    setMiniJourneyPrepStepIndex(0);
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setWortpostMode(false);
    setWortpostFocusStarted(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    setWortpostVisibleHelp(null);
    setSupport((current) => ({ ...current, imageHelp: true, syllableColors: true, reduceChoices: true }));
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function restartObjectFamilyMiniMomentInFocus() {
    setPhase('task');
  }

  function leaveObjectFamilyMiniMoment() {
    setObjectFamilyMomentMode(false);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function finishObjectFamilyMiniMoment() {
    setPhase('finish');
  }

  function startWordFamilyMiniJourney(anchorWord: WordFamilyJourneyAnchor = 'Mama') {
    const journey = getWordFamilyMiniJourney(localDidacticProfile, tasks, { anchorWord, maxPacks: 4 });
    if (journey.length !== 5) return;
    setChildHomeStarted(true);
    setActiveWordFamilyJourneyAnchor(anchorWord);
    setMiniJourneyPrepMode(false);
    setObjectFamilyMomentMode(false);
    setMiniJourneyPrepStepIndex(0);
    setMamaJourneyMode(true);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setMamaJourneyHelpActive(false);
    setPilotMode(false);
    setPilotFocusStarted(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setWortpostMode(false);
    setWortpostFocusStarted(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    setWortpostVisibleHelp(null);
    setSupport((current) => ({ ...current, imageHelp: true, syllableColors: true, reduceChoices: true }));
    setSuggestionAction('idle');
    setPhase('task');
    setMode('child');
  }

  function startMamaFamilyMiniJourney() {
    startWordFamilyMiniJourney('Mama');
  }

  function startSofaFamilyMiniJourney() {
    startWordFamilyMiniJourney('Sofa');
  }

  function startTasseFamilyMiniJourney() {
    startWordFamilyMiniJourney('Tasse');
  }

  function continueMamaFamilyMiniJourney() {
    setMamaJourneyHelpActive(false);
    setMamaJourneyStationIndex((current) => {
      if (current >= activeWordFamilyMiniJourney.length - 1) {
        setPhase('finish');
        return current;
      }
      return current + 1;
    });
  }

  function restartMamaFamilyMiniJourneyInFocus() {
    startWordFamilyMiniJourney(activeWordFamilyJourneyAnchor);
    setMamaJourneyStarted(true);
  }

  function leaveMamaFamilyMiniJourney() {
    setMamaJourneyMode(false);
    setMamaJourneyStarted(false);
    setMamaJourneyStationIndex(0);
    setMamaJourneyHelpActive(false);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }


  function applyWortpostProfilePreset(presetId: string) {
    const preset = wortpostProfilePresets.find((item) => item.id === presetId);
    if (!preset) return;
    setLocalKnownGraphemes([...preset.knownGraphemes]);
    setLocalKnownSyllables([...preset.knownSyllables]);
    setLocalAccessFocus(preset.accessFocus as AccessFocus);
    setLocalSupportSettings((current) => ({ ...current, ...preset.supportSettings }));
    setLocalReadiness({
      sentence: preset.readiness.sentence === 'supported',
      story: preset.readiness.story === 'supported',
      writingBridge: preset.readiness.writingBridge === 'optional',
    });
    setWortpostHelpDefaults((current) => ({
      ...current,
      'kleine-auswahl': Boolean(preset.supportSettings.reducedChoices),
      silben: true,
    }));
  }

  function toggleWortpostDefault(help: WortpostHelpKey) {
    setWortpostHelpDefaults((current) => ({ ...current, [help]: !current[help] }));
  }

  function activateWortpostHelp(help: WortpostHelpKey) {
    setWortpostVisibleHelp(help);
    if (help === 'silben') {
      setSupport((current) => ({ ...current, syllableColors: true }));
    }
    if (help === 'kleine-auswahl') {
      setSupport((current) => ({ ...current, reduceChoices: true }));
    }
    if (help === 'vormachen') {
      setSupport((current) => ({ ...current, signHint: true }));
    }
  }

  function answerWortpost(answer: string) {
    const matched = answer === activeTask.word;
    const profileCard = wortpostProfilePath.cards.find((card) => card.taskId === activeTask.id || card.word === activeTask.word);
    const sentenceBridge = matched ? (profileCard?.sentenceBridge ?? getWortpostSentenceBridge(activeTask.word)) : undefined;
    setWortpostAnswer(answer);
    setWortpostLearningRecord({
      word: activeTask.word,
      answer,
      matched,
      supportLabels: activeSupportLabels.length > 0 ? activeSupportLabels : ['Silbenhilfe sichtbar'],
      reducedChoices: Boolean(supportState.reduceChoices),
      visibleHelp: getWortpostHelpLabel(wortpostVisibleHelp),
      helpDefaults: getWortpostDefaultLabels(wortpostHelpDefaults),
      layerSummary: `Symbol sichtbar · Silben ${supportState.syllableColors ? 'sichtbar' : 'ausgeblendet'} · Wort sichtbar`,
      roundLabel: `Post ${wortpostCardIndex + 1} von ${wortpostTasks.length}`,
      pathReason: profileCard?.reason ?? 'heute klein starten',
      pathSummary: wortpostProfilePath.summary,
      developmentStageLabel: wortpostDevelopmentStage.label,
      developmentStageReason: wortpostDevelopmentStage.reason,
      developmentStageNextStep: wortpostDevelopmentStage.nextSmallStep,
      sentenceBridge,
    });
    setObservation((current) =>
      recordLearningAction(current as any, {
        kind: 'task',
        taskId: activeTask.id,
        support,
      }),
    );
    setPhase('feedback');
  }

  function continueWortpost() {
    const nextIndex = wortpostCardIndex + 1;
    if (nextIndex >= wortpostTasks.length) {
      setPhase('finish');
      return;
    }
    const nextTask = wortpostTasks[nextIndex];
    setWortpostCardIndex(nextIndex);
    setActiveTaskId(nextTask.id);
    setWortpostAnswer(null);
    setPhase('task');
  }

  function restartWortpostInFocus() {
    startWortpost();
    setWortpostFocusStarted(true);
  }

  function leaveWortpostFocus() {
    setWortpostFocusStarted(false);
    setWortpostMode(false);
    setWortpostCardIndex(0);
    setWortpostAnswer(null);
    setWortpostVisibleHelp(null);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function toggleLocalBuilderList(kind: 'grapheme' | 'syllable', value: string) {
    const setter = kind === 'grapheme' ? setLocalKnownGraphemes : setLocalKnownSyllables;
    setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  }

  function toggleLocalSupport(key: LocalSupportKey) {
    setLocalSupportSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleLocalReadiness(key: LocalReadinessKey) {
    setLocalReadiness((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleLearningCheck(key: LearningCheckKey) {
    setLearningCheckInput((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleDailyPathChoice(choiceId: string) {
    setPilotMode(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setSelectedDailyPathIds((current) => {
      if (current.includes(choiceId)) return current.filter((id) => id !== choiceId);
      if (current.length >= maxDailyPathCards) return current;
      return [...current, choiceId];
    });
    setSuggestionAction('idle');
    setPhase('task');
  }

  function resetDailyPathSelection() {
    setPilotMode(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setSelectedDailyPathIds([]);
    setSuggestionAction('idle');
    setPhase('task');
  }

  function applyTeacherSuggestion() {
    setPilotMode(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setSelectedDailyPathIds(teacherDailyPathSuggestion.selectedChoiceIds.slice(0, maxDailyPathCards));
    setSuggestionAction('applied');
    setPhase('task');
  }

  function ignoreTeacherSuggestion() {
    setSuggestionAction('ignored');
  }

  function finishReading() {
    setObservation((current) =>
      recordLearningAction(current as any, {
        kind: 'task',
        taskId: activeTask.id,
        support,
      }),
    );
    setPhase(pilotMode && pilotCardIndex >= twoCardPilotPath.length - 1 ? 'finish' : 'feedback');
  }

  function leavePilotFocus() {
    setPilotFocusStarted(false);
    setPilotMode(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function leaveGuidedFocus() {
    setGuidedFocusStarted(false);
    setGuidedFocusMode(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setMamaStepIndex(0);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function startLeseMission() {
    if (leseMissionItems.length === 0) return;
    setMode('child');
    setChildHomeStarted(true);
    setLeseMissionMode(true);
    setLeseMissionStarted(false);
    setLeseMissionStep('start');
    setLeseMissionItemIndex(0);
  }

  function leaveLeseMission() {
    setLeseMissionStarted(false);
    setLeseMissionMode(false);
    setLeseMissionStep('start');
    setLeseMissionItemIndex(0);
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function advanceLeseMission() {
    if (leseMissionStep === 'start') {
      setLeseMissionStep('word');
      return;
    }

    if (leseMissionStep === 'word') {
      setLeseMissionStep('action');
      return;
    }

    if (leseMissionStep === 'action' && leseMissionItemIndex < leseMissionItems.length - 1) {
      setLeseMissionItemIndex((current) => current + 1);
      setLeseMissionStep('word');
      return;
    }

    setLeseMissionStep('finish');
  }

  function finishStory(answer: string) {
    setObservation((current) =>
      recordLearningAction(current as any, {
        kind: 'story',
        storyId: activeStory.id,
        storyTitle: activeStory.title,
        support,
        answer,
        nextStep: activeStory.nextStep,
      }),
    );
    setPhase('feedback');
  }

  function continueTwoCardPilot() {
    const nextIndex = Math.min(pilotCardIndex + 1, twoCardPilotPath.length - 1);
    const nextPilotCard = twoCardPilotPath[nextIndex];
    if (!nextPilotCard || nextPilotCard.kind === 'story') {
      setPhase('finish');
      return;
    }
    setPilotCardIndex(nextIndex);
    setActiveTaskId(nextPilotCard.taskId);
    setReadingMode('task');
    setPhase('task');
  }

  function restartTwoCardPilot() {
    startTwoCardPilot();
  }

  function restartTwoCardPilotInFocus() {
    startTwoCardPilot();
    setPilotFocusStarted(true);
  }

  function continueSequenceGame() {
    const nextIndex = Math.min(sequenceCardIndex + 1, sequenceReadingPath.length - 1);
    const nextSequenceCard = sequenceReadingPath[nextIndex];
    if (!nextSequenceCard) {
      setPhase('finish');
      return;
    }
    setSequenceCardIndex(nextIndex);
    if (nextSequenceCard.kind === 'story') {
      setActiveStoryId(nextSequenceCard.storyId);
      setReadingMode('story');
    } else {
      setActiveTaskId(nextSequenceCard.taskId);
      setReadingMode('task');
    }
    setPhase('task');
  }

  function restartSequenceGameInFocus() {
    startSequenceGame();
    setSequenceFocusStarted(true);
  }

  function leaveSequenceFocus() {
    setSequenceFocusStarted(false);
    setSequenceMode(false);
    setSequenceCardIndex(0);
    setPhase('task');
    setMode('teacher');
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }

  function chooseNext(choice: 'Nochmal' | 'Weiter' | 'Fertig') {
    setObservation((current) => recordLearningAction(current as any, { kind: 'choice', choice }));
    if (choice === 'Fertig') {
      setPhase('finish');
      return;
    }
    if (choice === 'Nochmal') {
      setSupport((current) => ({ ...current, repeat: true }));
      setPhase('task');
      return;
    }
    if (readingMode === 'story') {
      const currentStoryIndex = stories.findIndex((story) => story.id === activeStory.id);
      const nextStoryIndex = Math.min(stories.length - 1, currentStoryIndex + 1);
      setActiveStoryId(stories[nextStoryIndex].id);
      setPhase('task');
      return;
    }
    const currentIndex = tasks.findIndex((task) => task.id === activeTask.id);
    const nextIndex = Math.min(tasks.length - 1, currentIndex + 1);
    setActiveTaskId(tasks[nextIndex].id);
    setPhase('task');
  }

  function resetLocalDemoState() {
    window.localStorage.removeItem(storageKey);
    setSelectedProfile(profiles[0]);
    setSupport({ syllableColors: true });
    setActiveTaskId(tasks[0].id);
    setActiveStoryId(stories[0].id);
    setReadingMode('task');
    setPilotMode(false);
    setGuidedFocusMode(false);
    setGuidedFocusStarted(false);
    setSequenceMode(false);
    setSequenceFocusStarted(false);
    setSequenceCardIndex(0);
    setPilotCardIndex(0);
    setSelectedDailyPathIds([]);
    setSuggestionAction('idle');
    setObservation(createEmptyObservation() as Observation);
    setWortpostLearningRecord(null);
    setPhase('task');
  }

  return (
    <main className="app-shell">
      {(mode === 'teacher' || !childHomeStarted) ? (
        <>
          <section className="hero-card" aria-labelledby="start-title">
            <div className="hero-copy">
              <p className="eyebrow">LeseWerk · lokaler Pilot-Demo-Stand</p>
              <h1 id="start-title">Willkommen im LeseWerk</h1>
              <p>Wir lesen langsam. Du darfst eine Hilfe wählen. Alles in Ruhe.</p>
            </div>
            <div className="mode-switch" aria-label="Bereich wählen">
              <button aria-pressed={mode === 'child'} className={mode === 'child' ? 'active' : ''} onClick={() => setMode('child')} type="button">
                Kinderpfad
              </button>
              <button aria-pressed={mode === 'teacher'} className={mode === 'teacher' ? 'active' : ''} onClick={() => setMode('teacher')} type="button">
                Lehrkraft
              </button>
            </div>
          </section>

          <section className="profile-section" aria-labelledby="profile-title">
            <div>
              <p className="section-kicker">Anonymes Profil</p>
              <h2 id="profile-title">Wer liest heute?</h2>
            </div>
            <div className="profile-grid">
              {profiles.map((profile) => (
                <button
                  aria-pressed={selectedProfile.id === profile.id}
                  className={`profile-card ${selectedProfile.id === profile.id ? 'selected' : ''}`}
                  key={profile.id}
                  onClick={() => chooseProfile(profile)}
                  type="button"
                >
                  <span className={`profile-symbol ${profile.id}`}>{profile.symbol}</span>
                  <strong>{profile.label}</strong>
                  <span>{profile.description}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {mode === 'child' ? (
        !childHomeStarted ? (
          <div className="child-welcome-shell">
            <div className="child-welcome-card">
              <div className="logo-group-large">
                <h1>LeseWerk</h1>
                <span className="pilot-badge">Schuljahr 2026/27</span>
              </div>
              <h2>Hallo! Was möchtest du heute machen?</h2>
              <div className="child-welcome-options">
                <button className="welcome-option-card welcome-option--daily" onClick={() => { setChildHomeStarted(true); startGuidedReadingPath(); }} type="button">
                  <span className="option-icon" aria-hidden="true">📅</span>
                  <div className="option-meta">
                    <strong>Mein Tag</strong>
                    <span>Dein Leseweg für heute</span>
                  </div>
                </button>
                {materialkorbItems.length > 0 && (
                  <button className="welcome-option-card welcome-option--mission" onClick={() => { setChildHomeStarted(true); startLeseMission(); }} type="button">
                    <span className="option-icon" aria-hidden="true">🎁</span>
                    <div className="option-meta">
                      <strong>Meine Mission</strong>
                      <span>Karten aus dem Korb</span>
                    </div>
                  </button>
                )}
                <button className="welcome-option-card welcome-option--journeys" onClick={() => { setChildHomeStarted(true); startWordFamilyMiniJourney((availableMiniJourneyCards[0]?.anchorWord ?? 'Mama') as WordFamilyJourneyAnchor); }} type="button">
                  <span className="option-icon" aria-hidden="true">🚀</span>
                  <div className="option-meta">
                    <strong>Meine Reisen</strong>
                    <span>Wörter entdecken</span>
                  </div>
                </button>
              </div>
              <button className="secondary-action welcome-teacher-link" onClick={() => setMode('teacher')} type="button">
                Für Lehrkräfte
              </button>
            </div>
          </div>
        ) : (
          <>
            <section className="learning-layout child-path-shell" aria-label="Kinderpfad Lesen">
              <div className="demo-header" style={{ position: 'relative' }}>
                <button className="back-to-home-btn" onClick={() => setChildHomeStarted(false)} title="Zurück zum Start" type="button" style={{ position: 'absolute', left: '12px', top: '12px', background: 'white', border: '2px solid #315b7f', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🏠</button>
                <div className="header-content" style={{ paddingLeft: '64px' }}>
                  <div className="logo-group">
                    <h1>LeseWerk V1</h1>
                    <span className="pilot-badge">S-Tier Preview</span>
                  </div>
                </div>
              </div>
              <div className="today-path-header">
                <div>
                  <p className="section-kicker">Tagespfad</p>
                  <h2>Heute lesen</h2>
                  <p>Schau. Klatsch. Lies.</p>
                  <p>Schritt {mamaStepIndex + 1} von {guidedReadingChain.steps.length}: {guidedReadingChain.steps[mamaStepIndex]?.helper ?? 'ruhig starten'}</p>
                </div>
                <button className="primary-action guided-start-action" onClick={startGuidedReadingPath} type="button">Tagespfad starten</button>
              </div>
              <div className="support-strip" aria-label="Hilfen für den Tagespfad">
                <div className="support-status-row">
                  <ActiveSupport labels={activeSupportLabels} />
                  {observation.observationCount > 0 ? <ChildRecommendation text={adaptivePlacement.suggestion} /> : null}
                </div>
                <details className="support-details support-choice-card">
                  <summary>Hilfe wählen</summary>
                  <p>Hilfe ist freiwillig.</p>
                  <SupportPanel support={support} onToggle={toggleSupport} />
                </details>
              </div>
              <div className="syllable-demo active-step-card">
                <FocusGameShell
                  active={pilotMode || guidedFocusMode || sequenceMode || wortpostMode || mamaJourneyMode || miniJourneyPrepMode || objectFamilyMomentMode || leseMissionMode}
                  started={leseMissionMode ? leseMissionStarted : pilotMode ? pilotFocusStarted : sequenceMode ? sequenceFocusStarted : wortpostMode ? wortpostFocusStarted : mamaJourneyMode ? mamaJourneyStarted : miniJourneyPrepMode || objectFamilyMomentMode ? true : guidedFocusStarted}
                  title={leseMissionMode ? 'Lese-Mission v1' : pilotMode ? '2-Karten-Pilot' : sequenceMode ? 'Auswahl-Spiel' : wortpostMode ? 'Wortpost' : objectFamilyMomentMode ? objectFamilyMiniSlice.childMiniMoment.title : mamaJourneyMode ? activeWordFamilyJourneyTitle : miniJourneyPrepMode ? `${activeMiniJourneyPrepAnchor}-Vorbereitung` : 'Tagespfad Mama'}
                  startText={leseMissionMode ? 'Mission starten' : pilotMode ? 'Spiel ruhig starten' : sequenceMode ? 'Auswahl-Spiel starten' : wortpostMode ? 'Wortpost starten' : objectFamilyMomentMode ? 'Objekt-Moment starten' : mamaJourneyMode ? 'Mini-Reise starten' : miniJourneyPrepMode ? 'Vorbereitung starten' : 'Tagespfad ruhig starten'}
                  helperText={pilotMode ? 'Es kommen nur zwei Karten. Ohne Uhr. Ohne Vergleich. Du kannst jederzeit zur Lehrkraft zurück.' : leseMissionMode ? 'Drei ausgewählte Wörter, ein ruhiger Weg, eine Aufgabe nach der anderen. Ohne Uhr und ohne Druck.' : sequenceMode ? `Es kommen ${sequenceReadingPath.length} vorbereitete Karten. Eine Karte nach der anderen. Ohne Uhr.` : wortpostMode ? 'Eine große Wortkarte geht zur passenden Symbolkarte. Antippen reicht. Ohne Bewertung, ohne Uhr.' : objectFamilyMomentMode ? 'Genau ein Mini-Moment mit Tisch, Tasse und Teller. Ohne Uhr.' : mamaJourneyMode ? 'Fünf ruhige Schritte: Bild, Silbe, Wort, Satz und kleine Geschichte. Ohne Uhr.' : miniJourneyPrepMode ? 'Eine kleine Vorbereitung. Ein Schritt nach dem anderen. Ohne Uhr.' : 'Du gehst Schritt für Schritt: schauen, klatschen, lesen. Ohne Uhr. Du kannst jederzeit zur Lehrkraft zurück.'}
                  success={leseMissionMode ? leseMissionStep === 'finish' : phase === 'finish'}
                  onStart={leseMissionMode ? () => { setLeseMissionStarted(true); setLeseMissionItemIndex(0); setLeseMissionStep('word'); } : pilotMode ? () => setPilotFocusStarted(true) : sequenceMode ? () => setSequenceFocusStarted(true) : wortpostMode ? () => setWortpostFocusStarted(true) : mamaJourneyMode ? () => setMamaJourneyStarted(true) : miniJourneyPrepMode || objectFamilyMomentMode ? () => undefined : () => setGuidedFocusStarted(true)}
                  onExit={leseMissionMode ? leaveLeseMission : pilotMode ? leavePilotFocus : sequenceMode ? leaveSequenceFocus : wortpostMode ? leaveWortpostFocus : objectFamilyMomentMode ? leaveObjectFamilyMiniMoment : mamaJourneyMode ? leaveMamaFamilyMiniJourney : miniJourneyPrepMode ? leaveMiniJourneyPrep : leaveGuidedFocus}
                  focusClassName={leseMissionMode ? 'focus-game-shell-lese-mission' : guidedFocusMode ? 'focus-game-shell-guided' : sequenceMode ? 'focus-game-shell-sequence' : wortpostMode ? 'focus-game-shell-wortpost' : objectFamilyMomentMode ? 'focus-game-shell-object-family' : mamaJourneyMode ? 'focus-game-shell-mama-journey' : miniJourneyPrepMode ? 'focus-game-shell-mini-prep' : 'focus-game-shell-pilot'}
                >
                  {phase === 'finish' ? (
                    <FinishScreen
                      pilotMode={pilotMode}
                      sequenceMode={sequenceMode}
                      wortpostMode={wortpostMode}
                      objectFamilyMomentMode={objectFamilyMomentMode}
                      mamaJourneyMode={mamaJourneyMode || miniJourneyPrepMode || objectFamilyMomentMode}
                      journeyTitle={objectFamilyMomentMode ? objectFamilyMiniSlice.childMiniMoment.title : miniJourneyPrepMode ? `${activeMiniJourneyPrepAnchor}-Vorbereitung` : activeWordFamilyJourneyTitle}
                      onAgain={pilotMode ? restartTwoCardPilotInFocus : sequenceMode ? restartSequenceGameInFocus : wortpostMode ? restartWortpostInFocus : objectFamilyMomentMode ? restartObjectFamilyMiniMomentInFocus : mamaJourneyMode ? restartMamaFamilyMiniJourneyInFocus : miniJourneyPrepMode ? restartMiniJourneyPrepInFocus : () => setPhase('task')}
                      onTeacher={pilotMode ? leavePilotFocus : sequenceMode ? leaveSequenceFocus : wortpostMode ? leaveWortpostFocus : objectFamilyMomentMode ? leaveObjectFamilyMiniMoment : mamaJourneyMode ? leaveMamaFamilyMiniJourney : miniJourneyPrepMode ? leaveMiniJourneyPrep : guidedFocusMode ? leaveGuidedFocus : () => setMode('teacher')}
                    />
                  ) : leseMissionMode ? (
                    <LeseMissionStage items={leseMissionItems} itemIndex={leseMissionItemIndex} started={leseMissionStarted} step={leseMissionStep} onStart={() => setLeseMissionStarted(true)} onNext={advanceLeseMission} onTeacher={leaveLeseMission} />
                  ) : objectFamilyMomentMode ? (
                    <ObjectFamilyMiniMomentStage slice={objectFamilyMiniSlice} onFinish={finishObjectFamilyMiniMoment} onTeacher={leaveObjectFamilyMiniMoment} />
                  ) : miniJourneyPrepMode ? (
                    <MiniJourneyPrepStage step={activeMiniJourneyPrep[miniJourneyPrepStepIndex]} stepIndex={miniJourneyPrepStepIndex} totalSteps={activeMiniJourneyPrep.length} onAgain={() => setMiniJourneyPrepStepIndex((current) => current)} onNext={continueMiniJourneyPrep} onTeacher={leaveMiniJourneyPrep} />
                  ) : mamaJourneyMode ? (
                    <MamaFamilyJourneyStage station={activeWordFamilyMiniJourney[mamaJourneyStationIndex]} stationIndex={mamaJourneyStationIndex} totalStations={activeWordFamilyMiniJourney.length} onAgain={() => setMamaJourneyStationIndex((current) => current)} helpActive={mamaJourneyHelpActive} onHelp={() => setMamaJourneyHelpActive(true)} onNext={continueMamaFamilyMiniJourney} onTeacher={leaveMamaFamilyMiniJourney} />
                  ) : wortpostMode ? (
                    phase === 'feedback' ? (
                      <WortpostFeedback answer={wortpostAnswer} activeTask={activeTask} cardIndex={wortpostCardIndex} totalCards={wortpostTasks.length} sentenceBridge={wortpostLearningRecord?.matched ? wortpostLearningRecord.sentenceBridge : undefined} onAgain={() => setPhase('task')} onContinue={continueWortpost} onTeacher={leaveWortpostFocus} />
                    ) : (
                      <WortpostStage activeTask={activeTask} cardIndex={wortpostCardIndex} developmentStage={wortpostDevelopmentStage} supportState={supportState} tasks={tasks} totalCards={wortpostTasks.length} visibleHelp={wortpostVisibleHelp} onHelp={activateWortpostHelp} onAnswer={answerWortpost} />
                    )
                  ) : guidedFocusMode ? (
                    <GuidedFocusStage chain={guidedReadingChain} stepIndex={mamaStepIndex} onFinish={finishReading} onNext={() => setMamaStepIndex((current) => Math.min(current + 1, guidedReadingChain.steps.length - 1))} onReset={() => setMamaStepIndex(0)} />
                  ) : sequenceMode ? (
                    phase === 'feedback' ? (
                      <SequenceFeedback activeLabel={readingMode === 'story' ? activeStory.title : activeTask.word} cardIndex={sequenceCardIndex} totalCards={sequenceReadingPath.length} onAgain={() => setPhase('task')} onContinue={sequenceCardIndex >= sequenceReadingPath.length - 1 ? () => setPhase('finish') : continueSequenceGame} onTeacher={leaveSequenceFocus} />
                    ) : activeSequenceItem?.kind === 'story' ? (
                      <StoryFocusStage story={activeStory} cardIndex={sequenceCardIndex} totalCards={sequenceReadingPath.length} supportState={supportState} onAnswer={finishStory} />
                    ) : (
                      <PilotFocusStage activeTask={activeTask} cardIndex={sequenceCardIndex} totalCards={sequenceReadingPath.length} supportState={supportState} progressLabel="Runde" onFinish={finishReading} />
                    )
                  ) : pilotMode ? (
                    phase === 'feedback' ? (
                      <PilotFeedback activeTask={activeTask} onContinue={continueTwoCardPilot} />
                    ) : (
                      <PilotFocusStage activeTask={activeTask} cardIndex={pilotCardIndex} totalCards={twoCardPilotPath.length} supportState={supportState} onFinish={finishReading} />
                    )
                  ) : (
                    <>
                      <div className="demo-header" style={{ display: 'none' }}>
                        <div><p className="section-kicker">Heute lesen</p><h2>{phase === 'feedback' ? 'Gut gelesen.' : readingMode === 'story' ? 'Lies die Story' : 'Dein Tagesweg'}</h2></div>
                        <p className="calm-feedback">{phase === 'feedback' ? 'Du hast ruhig gearbeitet. Was möchtest du jetzt?' : supportState.feedback}</p>
                      </div>
                      {phase === 'task' ? (
                        <>
                          <section className={pilotMode ? 'daily-path-panel pilot-path-panel' : 'daily-path-panel'} aria-labelledby="daily-path-title">
                            <div className="daily-path-heading">
                              <p className="section-kicker">{pilotMode ? '2-Karten-Pilot' : 'Kleine Auswahl'}</p>
                              <h3 id="daily-path-title">{pilotMode ? 'Heute nur zwei Karten' : 'Heute lesen'}</h3>
                              <p>{pilotMode ? 'Heute nur zwei Karten. Die Bildhilfe ist an. Alles in Ruhe.' : selectedDailyPathIds.length > 0 ? `${dailyReadingPath.length} vorbereitete Karte${dailyReadingPath.length === 1 ? '' : 'n'}. Alles in Ruhe.` : 'Vier ruhige Karten. Danach kannst du weiter lesen oder fertig sein.'}</p>
                            </div>
                            {pilotMode ? <p className="pilot-notice">Pilotkarte {pilotCardIndex + 1} von {twoCardPilotPath.length}. Danach endet der Lesemoment ruhig.</p> : null}
                            <div className="daily-path-grid" aria-label={`Tagesweg mit ${currentReadingPath.length} Karte${currentReadingPath.length === 1 ? '' : 'n'}`}>
                              {currentReadingPath.map((item) => (
                                <button aria-pressed={(item.kind === 'story' && item.storyId === activeStory.id && readingMode === 'story') || (item.kind !== 'story' && item.taskId === activeTask.id && readingMode === 'task')} className="daily-path-card" key={item.id} onClick={() => chooseDailyPathItem(item)} type="button">
                                  <span>{item.helper}</span>
                                  <strong>{item.label}</strong>
                                </button>
                              ))}
                            </div>
                          </section>
                          {pilotMode ? (<p className="library-panel library-panel-muted">Vollbibliothek für den Pilot nicht nötig. Zur Lehrkraft wechseln, wenn bewusst ein größerer Weg gebraucht wird.</p>) : (
                            <div className="secondary-library-panel">
                              <details className="library-panel">
                                <summary>Alle Wörter und Geschichten öffnen</summary>
                                <div className="reading-mode-switch" aria-label="Leseart wählen">
                                  <button aria-pressed={readingMode === 'task'} className={readingMode === 'task' ? 'active' : ''} onClick={() => setReadingMode('task')} type="button">Wort üben</button>
                                  <button aria-pressed={readingMode === 'story'} className={readingMode === 'story' ? 'active' : ''} onClick={() => setReadingMode('story')} type="button">Story lesen</button>
                                </div>
                                {readingMode === 'task' ? (
                                  <div className="word-choice" aria-label="Aufgabe auswählen">{visibleTasks.map((task) => (<button aria-pressed={task.id === activeTask.id} className={task.id === activeTask.id ? 'word-pill active' : 'word-pill'} key={task.id} onClick={() => chooseTask(task.id)} type="button">{task.word}</button>))}</div>
                                ) : (
                                  <div className="word-choice" aria-label="Story auswählen">{visibleStories.map((story) => (<button aria-pressed={story.id === activeStory.id} className={story.id === activeStory.id ? 'word-pill active' : 'word-pill'} key={story.id} onClick={() => chooseStory(story.id)} type="button">{story.title}</button>))}</div>
                                )}
                              </details>
                            </div>
                          )}
                          {readingMode === 'task' ? (
                            <>
                              <Leseleiter profile={activeDevelopmentProfile} />
                              <article className="reading-card">
                                <p className="section-kicker">{getStudentTaskLabel(activeTask)}</p>
                                <p className="task-prompt">{activeTask.prompt}</p>
                                {supportState.imageHelp ? <SymbolHelpCard symbolHelp={activeTask.symbolHelp} /> : null}
                                <div className="syllable-word" aria-label={`Lesewort ${activeTask.word}`}>{activeTask.syllables.map((syllable: { text: string; color: string }, index: number) => (<span className={supportState.syllableColors ? `syllable ${syllable.color}` : 'syllable plain'} key={`${activeTask.id}-${index}`}>{syllable.text}</span>))}</div>
                                {supportState.readAloud ? <p className="helper-hint">Lehrkraft liest bei Bedarf kurz vor. Danach liest du in Ruhe.</p> : null}
                                {supportState.signHint ? <GestureHint gestureHint={activeTask.gestureHint} /> : null}
                                <button className="primary-action" onClick={finishReading} type="button">Ich bin fertig</button>
                              </article>
                              <p className="helper-hint">Lege oder spure das Wort.</p>
                              <WritingBridgeCard bridge={activeWritingBridge} />
                            </>
                          ) : (
                            <StoryCard story={activeStory} supportState={supportState} onAnswer={finishStory} />
                          )}
                        </>
                      ) : (
                        <FeedbackChoices activeTask={activeTask} activeStory={activeStory} readingMode={readingMode} onChoice={chooseNext} />
                      )}
                    </>
                  )}
                </FocusGameShell>
                <div className="child-orientation-stack" aria-label="Leseweg Orientierung">
                  <GuidedReadingPath chain={guidedReadingChain} activeIndex={mamaStepIndex} orientationSteps={childOrientationSteps} />
                  <MamaStepCard chain={guidedReadingChain} stepIndex={mamaStepIndex} onFinish={finishReading} onNext={() => setMamaStepIndex((current) => Math.min(current + 1, guidedReadingChain.steps.length - 1))} onReset={() => setMamaStepIndex(0)} />
                </div>
              </div>
            </section>
          </>
        )
      ) : (
        <section className="teacher-panel" aria-labelledby="teacher-title">
          <p className="section-kicker">Lehrerbereich</p>
          <h2 id="teacher-title">Planung für heute</h2>
          {arrivalCue && (
            <div className="teacher-arrival-cue" style={{ background: '#f3f8fa', border: '1px solid #d9e3ea', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', color: '#2f4a56' }}>
              <strong>Gestartet aus Schulwerkstatt</strong>
              {arrivalCue.focus && <span> · Fokus: {arrivalCue.focus}</span>}
              {arrivalCue.view === 'alpha73a' && (
                <div style={{ marginTop: '4px', fontWeight: 800 }}>
                  Bereich: Alpha-73A Alltagswortschatz · <a href="#alpha73-inventory" style={{ color: 'var(--primary-accent)', textDecoration: 'underline' }}>Zum Materialkorb springen</a>
                </div>
              )}
            </div>
          )}
          <section className="teacher-onboarding-card teacher-secondary-card" aria-labelledby="teacher-onboarding-title">
            <div>
              <p className="section-kicker">Heute so nutzen</p>
              <h3 id="teacher-onboarding-title">Kurzer lokaler Lesemoment</h3>
              <p>Diese Demo begleitet 10–15 Minuten Lesen. Beobachte nur Sichtbares: gewählte Hilfe, Wiederholung, reduzierte Auswahl, Storyantwort, Stopp oder ruhiges Weitergehen.</p>
            </div>
            <ul className="pilot-boundary-list" aria-label="Grenzen für den Pilot">
              <li>Keine echten Namen, Fotos oder Klassenlisten speichern.</li>
              <li>Nach zwei Karten bewusst enden oder denselben kleinen Schritt wiederholen.</li>
              <li>Vorsichtig deuten: nur nächster pädagogischer Schritt, keine diagnostische Einordnung.</li>
            </ul>
          </section>
          <SeriesCompactPanel
            onSelect={setSelectedSeriesId}
            selectedSeriesId={selectedSeriesId}
            series={localReadingSeries}
          />
          
          <Alpha73MaterialkorbView
            items={materialkorbItems}
            onRemove={toggleMaterialkorb}
            onStartLeseMission={startLeseMission}
          />

          <Alpha73InventoryView
            items={filteredAlpha73}
            domains={alpha73Domains}
            gates={alpha73Gates}
            activeDomain={alpha73FilterDomain}
            activeGate={alpha73FilterGate}
            selectedIds={materialkorbSelectedIds}
            onToggleMaterialkorb={toggleMaterialkorb}
            onDomainChange={setAlpha73FilterDomain}
            onGateChange={setAlpha73FilterGate}
            onChooseTask={chooseTask}
          />
          <section className="daily-curation-card teacher-primary-card" aria-labelledby="daily-curation-title">
            <div className="two-card-pilot-start" aria-label="Zwei-Karten-Pilot starten">
              <div>
                <p className="section-kicker">Erstnutzung klein halten</p>
                <h3>2-Karten-Pilotmodus</h3>
                <p>Startet einen kurzen lokalen Lesemoment mit genau zwei vorhandenen Karten. Keine Bewertung, keine Zuschreibung, keine echten Namen.</p>
              </div>
              <button className="primary-action" onClick={startTwoCardPilot} type="button">
                Pilot starten: nur 2 Karten
              </button>
            </div>
            <div className="wortpost-start-card" aria-label="Wortpost testen">
              <div>
                <p className="section-kicker">Spielraum-Slice</p>
                <h3>Wortpost</h3>
                <p>Startet einen ruhigen Fokusraum: drei Wortpost-Stationen, große Symbolziele, sichtbare Hilfen und keine Bewertung.</p>
              </div>
              <section className="wortpost-today-controls" aria-labelledby="wortpost-today-controls-title">
                <div className="wortpost-controls-header">
                  <div>
                    <p className="section-kicker">Wortpost heute einstellen</p>
                    <h4 id="wortpost-today-controls-title">Bekannte Einheiten schnell setzen</h4>
                  </div>
                  <span>lokal · Vorschau reagiert sofort</span>
                </div>
                <div className="wortpost-preset-row" aria-label="Wortpost Presets wählen">
                  {wortpostProfilePresets.map((preset) => (
                    <button key={preset.id} onClick={() => applyWortpostProfilePreset(preset.id)} type="button">
                      {preset.label}
                    </button>
                  ))}
                </div>
                <div className="wortpost-preset-preview-grid" aria-label="Wortpost Vorher/Nachher Vorschau">
                  {wortpostPresetPreviews.map((preview) => (
                    <article className="wortpost-preset-preview-card" key={preview.presetId}>
                      <div>
                        <strong>{preview.presetLabel}</strong>
                        <span>{preview.stageChangeText}</span>
                      </div>
                      <p>{preview.reason}</p>
                      <small>{preview.nextCards.map((card) => card.word).join(' · ')}</small>
                    </article>
                  ))}
                </div>
                <div className="wortpost-unit-groups">
                  <div className="wortpost-unit-group" aria-label="Wortpost Grapheme heute bekannt">
                    <strong>Grapheme</strong>
                    <div className="wortpost-chip-row">
                      {wortpostProfileControlUnits.graphemes.map((unit) => (
                        <button aria-pressed={localKnownGraphemes.includes(unit)} className={localKnownGraphemes.includes(unit) ? 'selected' : ''} key={unit} onClick={() => toggleLocalBuilderList('grapheme', unit)} type="button">
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="wortpost-unit-group" aria-label="Wortpost Silben heute bekannt">
                    <strong>Silben</strong>
                    <div className="wortpost-chip-row">
                      {wortpostProfileControlUnits.syllables.map((syllable) => (
                        <button aria-pressed={localKnownSyllables.includes(syllable)} className={localKnownSyllables.includes(syllable) ? 'selected' : ''} key={syllable} onClick={() => toggleLocalBuilderList('syllable', syllable)} type="button">
                          {syllable}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="wortpost-start-settings" aria-label="Wortpost Hilfen vor dem Start wählen">
                  <button aria-pressed={wortpostHelpDefaults.silben} className={wortpostHelpDefaults.silben ? 'active' : ''} onClick={() => toggleWortpostDefault('silben')} type="button">
                    Silben sichtbar
                  </button>
                  <button aria-pressed={wortpostHelpDefaults['kleine-auswahl']} className={wortpostHelpDefaults['kleine-auswahl'] ? 'active' : ''} onClick={() => toggleWortpostDefault('kleine-auswahl')} type="button">
                    Kleine Auswahl
                  </button>
                  <button aria-pressed={wortpostHelpDefaults.vormachen} className={wortpostHelpDefaults.vormachen ? 'active' : ''} onClick={() => toggleWortpostDefault('vormachen')} type="button">
                    Vormachen bei Bedarf
                  </button>
                </div>
              </section>
              <div className="wortpost-profile-path" aria-label="Wortpost Profilpfad Vorschau">
                <strong>{wortpostProfilePath.summary}</strong>
                <span>{localObservationSummary.todayFocus}</span>
                <div className="wortpost-development-stage" aria-label="Wortpost Entwicklungsstufe">
                  <strong>Stufe: {wortpostDevelopmentStage.label}</strong>
                  <span>{wortpostDevelopmentStage.reason}</span>
                  <em>{wortpostDevelopmentStage.nextSmallStep}</em>
                </div>
                <ol>
                  {wortpostProfilePath.cards.map((card, index) => (
                    <li key={`${card.taskId}-${index}`}>
                      <span>Post {index + 1}: {card.word}</span>
                      <em>{card.reason}</em>
                    </li>
                  ))}
                </ol>
                <p>{wortpostProfilePath.teacherHint}</p>
              </div>
              <section className="word-family-material-section" aria-labelledby="word-family-material-title">
                <div>
                  <p className="section-kicker">lokale Vorbereitung</p>
                  <h4 id="word-family-material-title">Materialpakete aus bekannten Einheiten</h4>
                  <p>Maximal drei kleine Pakete aus vorhandenen Aufgaben. Nur als Lehrkraftstütze, ohne neue Speicherung.</p>
                </div>
                <section className="mini-journey-readiness" aria-labelledby="mini-journey-readiness-title">
                  <div>
                    <p className="section-kicker">Lehrkraft-Blick</p>
                    <h4 id="mini-journey-readiness-title">Mini-Reisen Bereitschaft</h4>
                    <p>Aus dem vorhandenen Mini-Reisen-Gating abgeleitet: Was ist bereit, was braucht noch Einheiten?</p>
                    <p className="mini-journey-readiness-legend">Status: bereit · braucht Einheiten · noch nicht zeigen</p>
                  </div>
                  <div className="mini-journey-readiness-grid" aria-label="Bereitschaft Mama Sofa Tasse">
                    {miniJourneyReadinessOverview.map((item) => (
                      <article className={`mini-journey-readiness-card mini-journey-readiness-card--${item.status.replace(/ /g, '-')}`} key={item.anchorWord}>
                        <div>
                          <strong>{item.anchorWord}</strong>
                          <span>{item.status}</span>
                        </div>
                        <p>{item.missingText}</p>
                        <p className="mini-journey-next-step">{item.nextSmallStep}</p>
                        {miniJourneyPrepActions.find((action) => action.anchorWord === item.anchorWord) ? (
                          <div className="mini-journey-prep-action">
                            <p>{miniJourneyPrepActions.find((action) => action.anchorWord === item.anchorWord)?.offerText}</p>
                            {miniJourneyPrepActions.find((action) => action.anchorWord === item.anchorWord)?.enabled ? (
                              <button
                                aria-label={`${item.anchorWord}-Vorbereitung starten`}
                                className="secondary-action"
                                onClick={() => startMiniJourneyPrep(item.anchorWord as MiniJourneyPrepAnchor)}
                                type="button"
                              >
                                {miniJourneyPrepActions.find((action) => action.anchorWord === item.anchorWord)?.startLabel}
                              </button>
                            ) : (
                              <span>{miniJourneyPrepActions.find((action) => action.anchorWord === item.anchorWord)?.startLabel}</span>
                            )}
                          </div>
                        ) : null}
                        <small>{item.knownUnitsSummary}</small>
                      </article>
                    ))}
                  </div>
                </section>
                <section className="object-family-mini-slice" aria-label="Objektfamilie: Sofa, Tisch, Tasse, Teller" aria-labelledby="object-family-mini-slice-title">
                  <div>
                    <p className="section-kicker">kleiner Objekt-Anschluss</p>
                    <h4 id="object-family-mini-slice-title">{objectFamilyMiniSlice.title}</h4>
                    <p>{objectFamilyMiniSlice.teacherPreparation.purpose}</p>
                  </div>
                  <div className="object-family-mini-preview" aria-label="Objektfamilie Vorschau">
                    {objectFamilyMiniSlice.objectWords.map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                  </div>
                  <div className="object-family-teacher-cue">
                    <p>{objectFamilyMiniSlice.teacherPreparation.materialCue}</p>
                    <p>{objectFamilyMiniSlice.teacherPreparation.nextSmallStep}</p>
                  </div>
                  <button className="primary-action" onClick={startObjectFamilyMiniMoment} type="button">
                    Objekt-Moment starten
                  </button>
                  <p className="privacy-hint">Lehrkraft bereitet vor. Im Kindermodus erscheint genau ein neuer Teller-Mini-Moment, lokal und ohne Speicherung.</p>
                </section>
                <section className="mini-journey-rationales" aria-labelledby="mini-journey-rationales-title">
                  <div>
                    <p className="section-kicker">Auswahl verstehen</p>
                    <h4 id="mini-journey-rationales-title">Warum diese Reise?</h4>
                    <p>Kurze Lehrkraftnotiz je Ankerwort: bekannte Einheit, Stufe, Hilfe und naechster kleiner Schritt.</p>
                  </div>
                  <div className="mini-journey-rationale-grid" aria-label="Begruendung der Mini-Reisen">
                    {miniJourneyTeacherRationales.map((rationale) => (
                      <article className="mini-journey-rationale-card" key={rationale.anchorWord}>
                        <div className="mini-journey-rationale-head">
                          <strong>{rationale.journeyTitle}</strong>
                          <span>{rationale.focus}</span>
                        </div>
                        <dl>
                          <div>
                            <dt>Bekannte Einheit</dt>
                            <dd>{rationale.knownUnits}</dd>
                          </div>
                          <div>
                            <dt>Stufe</dt>
                            <dd>{rationale.stage}</dd>
                          </div>
                          <div>
                            <dt>Warum</dt>
                            <dd>{rationale.why}</dd>
                          </div>
                          <div>
                            <dt>Hilft bei</dt>
                            <dd>{rationale.support}</dd>
                          </div>
                        </dl>
                        <p className="mini-journey-next-step">{rationale.nextSmallStep}</p>
                      </article>
                    ))}
                  </div>
                </section>
                {availableMiniJourneyCards.length > 0 ? (
                  <section className="mini-journey-selector" aria-labelledby="mini-journey-selector-title">
                    <div>
                      <p className="section-kicker">ruhig auswählen</p>
                      <h4 id="mini-journey-selector-title">Heute passende Lesereisen</h4>
                    </div>
                    <div className="mini-journey-card-grid" aria-label="Heute passende Lesereisen">
                      {availableMiniJourneyCards.map((card) => (
                        <article className="mini-journey-selector-card" key={card.anchorWord}>
                          <div className="mini-journey-card-topline">
                            <div className={`mini-journey-symbol-anchor mini-journey-symbol-anchor--${card.anchorWord.toLowerCase()}`} aria-label={`Bildhafter Symbolanker ${card.anchorWord}`}>
                              <div className="mini-journey-symbol-tile" aria-hidden="true">
                                {card.anchorWord === 'Ball' || card.anchorWord === 'Bus' || card.anchorWord === 'Buch' || card.anchorWord === 'Tisch' || card.anchorWord === 'Heft' ? (
                                  <span className="mini-journey-symbol-tile-word">{card.anchorWord}</span>
                                ) : (
                                  <>
                                    <span>{card.anchorWord === 'Apfel' ? 'Ap' : card.anchorWord === 'Tasse' ? 'Tas' : card.anchorWord === 'Sofa' ? 'So' : card.anchorWord === 'Lama' ? 'La' : 'Ma'}</span>
                                    <span>{card.anchorWord === 'Apfel' ? 'fel' : card.anchorWord === 'Tasse' ? 'se' : card.anchorWord === 'Sofa' ? 'fa' : 'ma'}</span>
                                  </>
                                )}
                              </div>
                              {card.anchorWord === 'Tasse' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--tasse" aria-hidden="true">
                                  <span className="mini-journey-cup-bowl" />
                                  <span className="mini-journey-cup-handle" />
                                  <span className="mini-journey-cup-saucer" />
                                </div>
                              ) : card.anchorWord === 'Sofa' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--sofa" aria-hidden="true">
                                  <span className="mini-journey-sofa-back" />
                                  <span className="mini-journey-sofa-seat" />
                                  <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--left" />
                                  <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--right" />
                                </div>
                              ) : card.anchorWord === 'Ball' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--ball" aria-hidden="true">
                                  <span className="mini-journey-ball-core" />
                                  <span className="mini-journey-ball-shine" />
                                </div>
                              ) : card.anchorWord === 'Bus' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--bus" aria-hidden="true">
                                  <span className="mini-journey-bus-body" />
                                  <span className="mini-journey-bus-window mini-journey-bus-window--front" />
                                  <span className="mini-journey-bus-window mini-journey-bus-window--back" />
                                  <span className="mini-journey-bus-wheel mini-journey-bus-wheel--front" />
                                  <span className="mini-journey-bus-wheel mini-journey-bus-wheel--back" />
                                </div>
                              ) : card.anchorWord === 'Buch' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--buch" aria-hidden="true">
                                  <span className="mini-journey-book-cover" />
                                  <span className="mini-journey-book-page mini-journey-book-page--left" />
                                  <span className="mini-journey-book-page mini-journey-book-page--right" />
                                  <span className="mini-journey-book-spine" />
                                </div>
                              ) : card.anchorWord === 'Lama' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--lama" aria-hidden="true">
                                  <span className="mini-journey-lama-body" />
                                  <span className="mini-journey-lama-neck" />
                                  <span className="mini-journey-lama-head" />
                                </div>
                              ) : card.anchorWord === 'Apfel' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--apfel" aria-hidden="true">
                                  <span className="mini-journey-apple-body" />
                                  <span className="mini-journey-apple-leaf" />
                                  <span className="mini-journey-apple-shine" />
                                </div>
                              ) : card.anchorWord === 'Tisch' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--tisch" aria-hidden="true">
                                  <span className="mini-journey-table-top" />
                                  <span className="mini-journey-table-leg mini-journey-table-leg--left" />
                                  <span className="mini-journey-table-leg mini-journey-table-leg--right" />
                                </div>
                              ) : card.anchorWord === 'Heft' ? (
                                <div className="mini-journey-symbol mini-journey-symbol--heft" aria-hidden="true">
                                  <span className="mini-journey-heft-cover" />
                                  <span className="mini-journey-heft-line mini-journey-heft-line--top" />
                                  <span className="mini-journey-heft-line mini-journey-heft-line--middle" />
                                  <span className="mini-journey-heft-label" />
                                </div>
                              ) : (
                                <div className="mini-journey-symbol mini-journey-symbol--mama" aria-hidden="true">
                                  <span className="mini-journey-mama-house" />
                                  <span className="mini-journey-mama-heart" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="mini-journey-card-kicker">Lesereise</span>
                              <strong>{card.journeyTitle}</strong>
                            </div>
                            <span className="mini-journey-word-anchor" aria-label={`Wortanker ${card.anchorWord}`}>
                              {card.anchorWord}
                            </span>
                          </div>
                          <p className="mini-journey-known-units">{card.knownUnitsSummary}</p>
                          <p>{card.fitReason}</p>
                          <ol className="mini-journey-step-chips" aria-label={`${card.anchorWord} in fünf Schritten`}>
                            {card.stepsPreview.map((step) => <li key={`${card.anchorWord}-${step}`}>{step}</li>)}
                          </ol>
                          <div className="mini-journey-card-action">
                            <button aria-label={card.startLabel} className="primary-action mini-journey-start" onClick={() => startWordFamilyMiniJourney(card.anchorWord as WordFamilyJourneyAnchor)} type="button">
                              {card.anchorWord === 'Heft' ? 'Heft-Mini-Reise starten' : card.anchorWord === 'Tisch' ? 'Tisch-Mini-Reise starten' : card.anchorWord === 'Apfel' ? 'Apfel-Mini-Reise starten' : card.anchorWord === 'Lama' ? 'Lama-Mini-Reise starten' : card.anchorWord === 'Buch' ? 'Buch-Mini-Reise starten' : card.anchorWord === 'Bus' ? 'Bus-Mini-Reise starten' : card.anchorWord === 'Ball' ? 'Ball-Mini-Reise starten' : card.anchorWord === 'Tasse' ? 'Tasse-Mini-Reise starten' : card.anchorWord === 'Sofa' ? 'Sofa-Mini-Reise starten' : 'Mama-Mini-Reise starten'}
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
                <div className="word-family-material-grid" aria-label="Wortfamilien Materialpakete">
                  {wordFamilyMaterialPacks.map((pack) => (
                    <article className="word-family-material-card" key={pack.id}>
                      <div className="word-family-material-head">
                        <strong>{pack.title}</strong>
                        <span>{pack.stageFit}</span>
                      </div>
                      <p>{pack.childSafeSummary}</p>
                      <ol aria-label={`Materialfolge ${pack.anchorWord}`}>
                        {pack.materialSteps.map((step) => (
                          <li key={`${pack.id}-${step.label}`}>
                            <span>{step.label}</span>
                            <em>{step.cue}</em>
                          </li>
                        ))}
                      </ol>
                      <small>{pack.taskRefs.slice(0, 3).map((ref) => `${ref.step}: ${ref.taskId}`).join(' · ')}</small>
                      <p className="privacy-hint">{pack.teacherUse}</p>
                    </article>
                  ))}
                </div>
              </section>
              <button className="primary-action" onClick={startWortpost} type="button">
                Wortpost testen
              </button>
            </div>
            <section className="practice-pilot-card" aria-labelledby="practice-pilot-title">
              <div>
                <p className="section-kicker">Nach dem Pilot</p>
                <h3 id="practice-pilot-title">Praxis-Pilotkarte</h3>
                <p>Nach dem 2-Karten-Pilot nur Sichtbares festhalten. Keine Namen, keine Zuschreibung, keine Speicherung.</p>
              </div>
              <div className="practice-prompt-grid" aria-label="Drei Praxisfragen nach dem Pilot">
                <label className="practice-prompt-field">
                  <span>Start gelungen?</span>
                  <textarea aria-label="Start gelungen?" placeholder="Kurze Notiz im Browser" rows={2} />
                </label>
                <label className="practice-prompt-field">
                  <span>Welche Hilfe wurde genutzt?</span>
                  <textarea aria-label="Welche Hilfe wurde genutzt?" placeholder="Kurz sichtbare Hilfe notieren" rows={2} />
                </label>
                <label className="practice-prompt-field">
                  <span>Nächster kleinster Schritt?</span>
                  <textarea aria-label="Nächster kleinster Schritt?" placeholder="Ein kleiner nächster Schritt" rows={2} />
                </label>
              </div>
              <p className="privacy-hint">Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.</p>
            </section>
            <div className="daily-curation-header">
              <div>
                <p className="section-kicker">Auswahl lokal</p>
                <h3 id="daily-curation-title">Tagesweg wählen</h3>
                <p>Maximal vier Karten aus vorhandenen Aufgaben und Stories. Ohne Auswahl bleibt der sichere Standardpfad aktiv.</p>
              </div>
              <div className="teacher-action-row">
                <button className="primary-action" onClick={startSequenceGame} type="button">
                  Auswahl-Spiel starten
                </button>
                <button className="secondary-action" onClick={resetDailyPathSelection} type="button">
                  Sicherer Standardpfad
                </button>
              </div>
            </div>
            <div className="curation-status" aria-live="polite">
              {selectedDailyPathIds.length === 0
                ? 'Heute nutzt der Kinderpfad den sicheren Alpha-9-Standard.'
                : `${selectedDailyPathIds.length} von ${maxDailyPathCards} Karten vorbereitet.`}
            </div>
            <div className="curation-choice-grid" aria-label="Karten für heute auswählen">
              {dailyPathChoices.map((choice) => {
                const selected = selectedDailyPathIds.includes(choice.id);
                const disabled = !selected && selectedDailyPathIds.length >= maxDailyPathCards;
                return (
                  <button
                    aria-pressed={selected}
                    className={selected ? 'curation-choice selected' : 'curation-choice'}
                    disabled={disabled}
                    key={choice.id}
                    onClick={() => toggleDailyPathChoice(choice.id)}
                    type="button"
                  >
                    <span>{choice.helper}</span>
                    <strong>{choice.label}</strong>
                  </button>
                );
              })}
            </div>
            <p className="privacy-hint">Lokal und anonym: keine echten Namen, keine Datei, keine Online-Übertragung und keine automatische Speicherung.</p>
          </section>
          <section className="teacher-development-overview teacher-secondary-card" aria-labelledby="teacher-development-title">
            <div>
              <p className="section-kicker">lokal und manuell</p>
              <h3 id="teacher-development-title">Arbeitsstand und nächster möglicher Anschluss</h3>
              <p>Der Kinderpfad bleibt unverändert. Die Karte hilft nur beim ruhigen Vorbereiten des nächsten Anschlusses.</p>
            </div>
            <div className="teacher-development-grid" aria-label="Arbeitsstand und nächster möglicher Anschluss">
              <SummaryItem label="Bekannte Einheiten" value={teacherDevelopmentOverview.knownUnits} />
              <SummaryItem label="Aktuelle Hilfe" value={teacherDevelopmentOverview.support} />
              <SummaryItem label="Orientierung" value={teacherDevelopmentOverview.orientation.replace(/^Orientierung:\s*/, '')} />
              <SummaryItem label="Nächster möglicher Anschluss" value={teacherDevelopmentOverview.nextConnection.replace(/^Nächster möglicher Anschluss:\s*/, '')} />
            </div>
            <p className="privacy-hint">Nur Orientierung, keine Bewertung. Lokal, anonym und erst nach bewusster Auswahl für den Unterricht nutzen.</p>
          </section>
          <section className="word-family-review-card teacher-secondary-card" aria-labelledby="word-family-review-title">
            <div className="word-family-review-intro">
              <p className="section-kicker">sichten und vorbereiten</p>
              <h3 id="word-family-review-title">Review vorhandener Wortfamilien</h3>
              <p>Vorhandene Wortfamilien sichten, manuell vergleichen und als ruhiger Anschluss vormerken. Der Kinderpfad bleibt unverändert.</p>
            </div>
            <div className="word-family-review-grid" aria-label="Vorhandene Wortfamilien sichten">
              {teacherWordFamilyReviewSlices.map((slice) => (
                <article className="word-family-review-row" key={slice.id}>
                  <div className="word-family-review-row-head">
                    <strong className="word-family-review-word">{slice.word}</strong>
                    <span>nur sichten · manuell</span>
                  </div>
                  <p className="word-family-review-title-text">{slice.title}</p>
                  <p className="word-family-review-chain">{slice.chainLabel}</p>
                  <p className="word-family-review-cue">{slice.teacherCue}</p>
                </article>
              ))}
            </div>
            <p className="privacy-hint">Nur Sichtung und Vorbereitung: keine Speicherung, keine automatische Auswahl und kein neuer Kindermodus.</p>
          </section>
          <section className="teacher-suggestion-card teacher-secondary-card" aria-labelledby="teacher-suggestion-title">
            <div className="teacher-suggestion-header">
              <div>
                <p className="section-kicker">lokal, anonym und vorsichtig</p>
                <h3 id="teacher-suggestion-title">Vorschlag für den nächsten Tagesweg</h3>
              </div>
              <span>{teacherDailyPathSuggestion.dataQuality}</span>
            </div>
            <div className="teacher-suggestion-body">
              <SummaryItem label="Vorschlag" value={teacherDailyPathSuggestion.suggestion} />
              <SummaryItem label="Warum dieser Vorschlag?" value={teacherDailyPathSuggestion.reason.replace(/^Warum dieser Vorschlag\?\s*/, '')} />
              <SummaryItem label="Alternative" value={teacherDailyPathSuggestion.alternative} />
              <SummaryItem label="Nächster kleiner Schritt" value={teacherDailyPathSuggestion.nextSmallStep} />
            </div>
            <div className="teacher-suggestion-actions">
              <button className="primary-action" onClick={applyTeacherSuggestion} type="button">
                Tagesweg übernehmen und aktivieren
              </button>
              <button className="secondary-action" onClick={ignoreTeacherSuggestion} type="button">
                Ignorieren
              </button>
            </div>
            <p className="privacy-hint" aria-live="polite">
              {suggestionAction === 'applied'
                ? 'Tagesweg übernommen. Der Kinderpfad nutzt jetzt diese manuelle Auswahl.'
                : suggestionAction === 'ignored'
                  ? 'Vorschlag verworfen. Der aktuelle Kinderpfad bleibt unverändert; die Lehrkraft entscheidet weiter selbst.'
                  : 'Nur Vorschlag: Erst mit Klick wird der Tagesweg geändert. Der Kinderpfad bleibt bis dahin unverändert.'}
            </p>
          </section>
          <section className="local-profile-builder teacher-secondary-card" aria-labelledby="local-profile-builder-title">
            <div className="local-profile-builder-header">
              <div>
                <p className="section-kicker">lokal, anonym, nur Vorschau</p>
                <h3 id="local-profile-builder-title">Lokales Leseprofil einstellen</h3>
                <p>Wähle bekannte Grapheme, Silben und Hilfen für den heutigen Unterrichtsmoment. Es gibt kein Namensfeld und keine Speicherung.</p>
              </div>
              <span className="guided-path-badge">nur im Browser</span>
            </div>
            <div className="builder-group" aria-label="Bekannte Grapheme wählen">
              <strong>Bekannte Grapheme</strong>
              <div className="builder-chip-grid">
                {profileBuilderOptions.graphemes.map((unit) => (
                  <button aria-pressed={localKnownGraphemes.includes(unit)} className={localKnownGraphemes.includes(unit) ? 'builder-chip selected' : 'builder-chip'} key={unit} onClick={() => toggleLocalBuilderList('grapheme', unit)} type="button">
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-group" aria-label="Bekannte Silben wählen">
              <strong>Bekannte Silben</strong>
              <div className="builder-chip-grid">
                {profileBuilderOptions.syllables.map((syllable) => (
                  <button aria-pressed={localKnownSyllables.includes(syllable)} className={localKnownSyllables.includes(syllable) ? 'builder-chip selected' : 'builder-chip'} key={syllable} onClick={() => toggleLocalBuilderList('syllable', syllable)} type="button">
                    {syllable}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-group" aria-label="Hilfen wählen">
              <strong>Hilfen</strong>
              <div className="builder-chip-grid">
                {profileBuilderOptions.supportSettings.map((option) => (
                  <button aria-pressed={Boolean(localSupportSettings[option.id as LocalSupportKey])} className={localSupportSettings[option.id as LocalSupportKey] ? 'builder-chip selected' : 'builder-chip'} key={option.id} onClick={() => toggleLocalSupport(option.id as LocalSupportKey)} type="button">
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-group" aria-label="Bereitschaft als lokale Unterrichtsspur: Satz heute mit Hilfe, Mini-Geschichte heute mit Hilfe, Schreibbrücke heute optional">
              <strong>Bereitschaft</strong>
              <p className="builder-note">Nur heutiges Angebot beschreiben, keine Fähigkeit festlegen.</p>
              <div className="builder-chip-grid">
                {profileBuilderOptions.readiness.map((option) => (
                  <button aria-pressed={Boolean(localReadiness[option.id as LocalReadinessKey])} className={localReadiness[option.id as LocalReadinessKey] ? 'builder-chip selected' : 'builder-chip'} key={option.id} onClick={() => toggleLocalReadiness(option.id as LocalReadinessKey)} type="button">
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-group" aria-label="Zugangsschwerpunkt wählen">
              <strong>Zugangsschwerpunkt</strong>
              <div className="builder-chip-grid">
                {profileBuilderOptions.accessFocus.map((option) => (
                  <button aria-pressed={localAccessFocus === option.id} className={localAccessFocus === option.id ? 'builder-chip selected' : 'builder-chip'} key={option.id} onClick={() => setLocalAccessFocus(option.id as AccessFocus)} type="button">
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="adaptive-preview" aria-live="polite">
              <SummaryItem label="Heute im Blick" value={localObservationSummary.todayFocus.replace(/^Heute im Blick: /, '')} />
              <SummaryItem label="Hilfe" value={localObservationSummary.helpSummary.replace(/^Hilfe: /, '')} />
              <SummaryItem label="Nächster kleiner Schritt" value={localAdaptiveNextStep.nextSmallStep} />
              <SummaryItem label="Heute auslassen" value={localObservationSummary.omitSummary.replace(/^Heute auslassen:\s*/, '')} />
            </div>
            <details className="adaptive-preview-details">
              <summary>Weitere Profil-Vorschau anzeigen</summary>
              <div className="adaptive-preview" aria-label="Weitere lokale Profil-Vorschau">
                <SummaryItem label="Bereitschaft" value={localObservationSummary.readinessSummary} />
                <SummaryItem label="Heute passend" value={`${localAdaptiveNextStep.pathCards.length} Karte(n): ${localAdaptiveNextStep.pathCards.map((card: any) => card.word).join(', ') || 'gemeinsam starten'}`} />
                <SummaryItem label="Warum passt das?" value={localObservationSummary.whyItFits.replace(/^Warum passt das\?\s*/, '')} />
                <SummaryItem label="Hilfen" value={localAdaptiveNextStep.supportPlan.join(' ')} />
                {localAdaptiveNextStep.writingBridgeSuggestion ? <SummaryItem label="Schreibbrücke" value={localAdaptiveNextStep.writingBridgeSuggestion} /> : null}
              </div>
            </details>
            <details className="curated-observation-tasks" aria-label="Kuratierte Beobachtungsaufgaben">
              <summary>Kuratierte Einzelaufgaben anzeigen</summary>
              <p>Die sieben Alpha-34-Aufgaben bleiben verfügbar, liegen aber unter den Unterrichtsserien, damit der Lehrkraftbereich ruhiger bleibt.</p>
              <div className="profile-safe-card-list">
                {localCuratedObservationTasks.map((task: any) => (
                  <article className="profile-safe-row" key={task.id}>
                    <div>
                      <strong>{task.title}</strong>
                      <span>{task.observationKind}</span>
                    </div>
                    <p>{task.childPrompt}</p>
                    <p>{task.supportCue}</p>
                  </article>
                ))}
              </div>
            </details>
            <p className="privacy-hint">{localAdaptiveNextStep.safetyNote} Der Kinderpfad bleibt unverändert, bis die Lehrkraft bewusst eine Karte auswählt.</p>
          </section>
          <section className="profile-safe-preview teacher-secondary-card" aria-labelledby="profile-safe-preview-title">
            <div className="profile-safe-preview-header">
              <div>
                <p className="section-kicker">Demo-Profil</p>
                <h3 id="profile-safe-preview-title">Profil-Vorschau: Was passt heute?</h3>
                <p>Nur anonyme Demo-Profile. Der Kinderpfad wird dadurch nicht automatisch verändert.</p>
              </div>
              <div className="profile-safe-tabs" aria-label="Demo-Profil wählen">
                {teacherPreviewProfiles.map((profile) => (
                  <button
                    aria-pressed={teacherPreviewProfileKey === profile.key}
                    className={teacherPreviewProfileKey === profile.key ? 'selected' : ''}
                    key={profile.key}
                    onClick={() => setTeacherPreviewProfileKey(profile.key)}
                    type="button"
                  >
                    {profile.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="profile-safe-summary">{teacherPreviewDailyPath.summary}</p>
            <div className="profile-safe-card-list" aria-label="Kleiner Leseweg für das Demo-Profil">
              {teacherPreviewDailyPath.cards.map((card: { taskId: string; word: string; mode: string; visibleOptions: string[]; hiddenOptions: string[] }) => (
                <article className="profile-safe-row" key={card.taskId}>
                  <div>
                    <strong>{card.word}</strong>
                    <span>{getProfileSafeModeLabel(card.mode)}</span>
                  </div>
                  <p>Sichtbar: {card.visibleOptions.join(', ') || '—'}</p>
                  <p>Noch nicht im kleinen Leseweg: {card.hiddenOptions.join(', ') || '—'}</p>
                </article>
              ))}
            </div>
            <p className="profile-safe-blocked">
              Heute auslassen: {teacherPreviewBlockedText}.
            </p>
            <details className="coverage-inspector">
              <summary>Coverage-Check: Was ist schon getaggt?</summary>
              <p className="coverage-summary">{coverageSummary.summary} Lokale Strukturierungshilfe, kein Profil-Editor.</p>
              <div className="coverage-grid" aria-label="Coverage-Check Kennzahlen">
                <SummaryItem label="Getaggte Aufgaben" value={String(coverageSummary.totalRequirements)} />
                <SummaryItem label="Level A / B / C" value={`A ${coverageSummary.levelCounts.A} · B ${coverageSummary.levelCounts.B} · C ${coverageSummary.levelCounts.C}`} />
                <SummaryItem label="mit Prüfung durch Lehrkraft" value={String(coverageSummary.teacherReviewCount)} />
                <SummaryItem label="Komplexe Einheiten" value={coverageSummary.complexUnits.join(', ') || 'keine'} />
                <SummaryItem label="Sichtbar im Demo-Profil" value={String(coverageProfileFit?.visibleCount ?? 0)} />
                <SummaryItem label="Reduziert / gemeinsam / auslassen" value={`${coverageProfileFit?.reducedChoiceCount ?? 0} / ${coverageProfileFit?.teacherLedCount ?? 0} / ${coverageProfileFit?.blockedCount ?? 0}`} />
              </div>
              <p className="coverage-samples">Prüfung: {coverageSummary.sampleReviewTaskIds.join(', ') || 'keine'} · Heute auslassen: {coverageSummary.sampleBlockedTaskIds.join(', ') || 'keine'}</p>
            </details>
          </section>
          <section className="pilot-protocol-card teacher-tertiary-card" aria-labelledby="pilot-protocol-title">
            <div>
              <p className="section-kicker">10–15-Minuten-Pilot</p>
              <h3 id="pilot-protocol-title">Kurz und ruhig durchführen</h3>
            </div>
            <ol className="pilot-protocol-list">
              <li><strong>1. Gerät bereit</strong><span>App lokal öffnen, anonymes Farbprofil wählen und eine Hilfe sichtbar lassen.</span></li>
              <li><strong>2. Zwei Karten lesen</strong><span>Mit dem Tagesweg beginnen, bei Bedarf auf zwei Karten begrenzen.</span></li>
              <li><strong>3. Sachlich festhalten</strong><span>Nur Hilfe, Wiederholung, reduzierte Auswahl, Storyantwort oder Stopp beschreiben.</span></li>
              <li><strong>4. Ohne Einordnung enden</strong><span>Nach 10–15 Minuten ruhig schließen; keine Bewertung und keine Akte daraus machen.</span></li>
            </ol>
          </section>
          <section className="learning-check-card teacher-secondary-card" aria-labelledby="learning-check-title">
            <div className="local-profile-builder-header">
              <div>
                <p className="section-kicker">lokal, anonym, keine Speicherung</p>
                <h3 id="learning-check-title">Lernstart: kurzer Check</h3>
                <p>Planungshilfe für den heutigen Start. Kein Test, keine feste Einordnung, kein Personenfeld und kein Vergleich.</p>
              </div>
              <span className="guided-path-badge">Lehrkraft</span>
            </div>
            <div className="builder-group" aria-label="Kurze Beobachtung wählen">
              <strong>Beobachtung</strong>
              <div className="builder-chip-grid learning-check-chip-grid">
                {[
                  ['imageSupportUsed', 'Bildhilfe genutzt'],
                  ['reducedChoicesUsed', 'Kleine Auswahl hilft'],
                  ['syllableStepComfortable', 'Silbe wirkt ruhig'],
                  ['wordStepComfortable', 'Wort ist zugänglich'],
                  ['sentenceOrStoryReady', 'Satz/Story kann mitgehen'],
                  ['writingBridgeReady', 'Schreibbrücke passt'],
                ].map(([key, label]) => (
                  <button aria-pressed={Boolean(learningCheckInput[key as LearningCheckKey])} className={learningCheckInput[key as LearningCheckKey] ? 'builder-chip selected' : 'builder-chip'} key={key} onClick={() => toggleLearningCheck(key as LearningCheckKey)} type="button">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="adaptive-preview learning-check-result" aria-live="polite">
              <SummaryItem label="Heute starten mit" value={learningCheckDailyPath.todayStart} />
              <SummaryItem label="Nächster kleiner Schritt" value={learningCheckDailyPath.nextSmallStep} />
              <SummaryItem label="Hilfen" value={learningCheckDailyPath.supportPlan.join(' ')} />
              {learningCheckDailyPath.writingBridgeSuggestion ? <SummaryItem label="Schreibbrücke" value={learningCheckDailyPath.writingBridgeSuggestion} /> : null}
            </div>
            <p className="privacy-hint">{learningCheckDailyPath.safetyNote} Der Kinderpfad bleibt unverändert.</p>
          </section>
          {wortpostLearningRecord ? <WortpostTeacherRecord record={wortpostLearningRecord} /> : null}
          <div className="teacher-planning-grid" aria-label="Kompakte Planungsübersicht">
            <SummaryItem label="Beobachtung" value={teacherSummary.supportHistory.observation} />
            <SummaryItem label="Genutzte Hilfe" value={teacherSummary.supportHistory.help} />
            <SummaryItem label="Heutiger Vorschlag" value={adaptivePlacement.teacherExplanation.suggestedPath} />
            <SummaryItem label="Nächster Schritt" value={adaptivePlacement.teacherExplanation.nextSmallStep} />
          </div>
          <details className="teacher-detail-block">
            <summary>Längere Einordnung anzeigen</summary>
            <div className="summary-grid teacher-history-grid">
              <SummaryItem label="Profil" value={teacherSummary.profileLabel} />
              <SummaryItem label="Datenqualität" value={teacherSummary.dataQuality} />
              <SummaryItem label="Situation" value={teacherSummary.supportHistory.situation} />
              <SummaryItem label="Handlung" value={teacherSummary.supportHistory.action} />
              <SummaryItem label="Einordnung" value={adaptivePlacement.teacherExplanation.uncertainty} />
              <SummaryItem label="Begründung" value={adaptivePlacement.teacherExplanation.observedSignals} />
            </div>
          </details>
          <section className="teacher-observation-card teacher-tertiary-card" aria-labelledby="teacher-observation-title">
            <div>
              <p className="section-kicker">Lokal und anonym</p>
              <h3 id="teacher-observation-title">Anonyme Beobachtungskarte</h3>
              <p>Nur sichtbare Unterrichtssignale aus dem aktuellen Demo-Stand. Keine echten Namen, keine diagnostische Einordnung, keine Fotos, keine Cloud.</p>
            </div>
            <div className="summary-grid observation-summary-grid">
              <SummaryItem label="Profilfarbe" value={teacherSummary.profileLabel} />
              <SummaryItem label="Sichtbare Beobachtung" value={teacherSummary.supportHistory.observation} />
              <SummaryItem label="Genutzte Hilfe" value={teacherSummary.supportHistory.help} />
              <SummaryItem label="Nächster kleiner Schritt" value={adaptivePlacement.teacherExplanation.nextSmallStep} />
            </div>
          </section>
          <section className="local-print-preview teacher-tertiary-card" aria-labelledby="local-print-preview-title">
            <div className="print-preview-header">
              <div>
                <p className="section-kicker">Nur lokal</p>
                <h3 id="local-print-preview-title">Lokale Druckvorschau</h3>
              </div>
              <button className="print-button" onClick={() => window.print()} type="button">
                Im Browser drucken
              </button>
            </div>
            <div className="summary-grid print-summary-grid">
              <SummaryItem label="Anonymes Profil" value={teacherSummary.profileLabel} />
              <SummaryItem label="Aktuelle Beobachtung" value={teacherSummary.supportHistory.observation} />
              <SummaryItem label="Genutzte Hilfen" value={teacherSummary.supportHistory.help} />
              <SummaryItem label="Vorsichtiger Vorschlag" value={adaptivePlacement.teacherExplanation.suggestedPath} />
              <SummaryItem label="Nächster kleiner Schritt" value={adaptivePlacement.teacherExplanation.nextSmallStep} />
            </div>
            <p className="privacy-hint">
              Datenschutz: Diese Vorschau bleibt in diesem Browser. Sie enthält nur den aktuellen anonymen Demo-Stand: keine echten Namen, keine diagnostische Einordnung, keine Fotos, keine Cloud, keine Datei, keine Online-Übertragung und keine automatische Speicherung.
            </p>
          </section>
          <p className="teacher-hint">{teacherSummary.hint}</p>
          <button className="reset-button" onClick={resetLocalDemoState} type="button">
            Lokalen Demo-Stand zurücksetzen
          </button>
        </section>
      )}
    </main>
  );
}

function WortpostTeacherRecord({ record }: { record: WortpostLearningRecord }) {
  const supportText = record.supportLabels.join(' · ');
  const routeText = record.matched
    ? `Heute sichtbar: Die Wortkarte „${record.word}“ wurde zum passenden Zielpostfach gelegt.`
    : `Heute sichtbar: Die Wortkarte „${record.word}“ ging zuerst zu „${record.answer}“; ein ruhiges Nochmal ist sinnvoll.`;
  const nextStep = record.matched
    ? 'Nächster kleiner Schritt: Hilfe beibehalten und mit der nächsten Wortkarte wiederholen.'
    : 'Nächster kleiner Schritt: Auswahl klein lassen, Wortkarte gemeinsam lesen und Ziel noch einmal zeigen.';

  return (
    <section className="wortpost-teacher-record teacher-secondary-card" aria-labelledby="wortpost-teacher-record-title">
      <div>
        <p className="section-kicker">Wortpost · Lernerfahrung</p>
        <h3 id="wortpost-teacher-record-title">Ruhiger Beobachtungshinweis</h3>
        <p>Nur sichtbare Handlung aus dieser lokalen Runde. Keine Bewertung, keine Einstufung, keine Speicherung.</p>
      </div>
      <div className="summary-grid wortpost-record-grid">
        <SummaryItem label="Mini-Weg" value={record.roundLabel} />
        <SummaryItem label="Aktuelles Wort" value={record.word} />
        <SummaryItem label="Warum ausgewählt" value={`${record.pathReason} · ${record.pathSummary}`} />
        <SummaryItem label="Entwicklungsstufe" value={`${record.developmentStageLabel}: ${record.developmentStageReason}`} />
        <SummaryItem label="Nächster Stufenschritt" value={record.developmentStageNextStep} />
        <SummaryItem label="Satzbrücke" value={record.sentenceBridge ?? 'nur nach passender Ankunft sichtbar'} />
        <SummaryItem label="Sichtbare Handlung" value={routeText} />
        <SummaryItem label="Hilfe-Start" value={record.helpDefaults.join(' · ')} />
        <SummaryItem label="Heute sichtbare Hilfe" value={record.visibleHelp} />
        <SummaryItem label="Genutzte Hilfen" value={`${supportText}${record.reducedChoices ? ' · reduzierte Auswahl' : ''}`} />
        <SummaryItem label="Lese-Schichten sichtbar" value={record.layerSummary} />
        <SummaryItem label="Nächster kleiner Schritt" value={nextStep} />
      </div>
    </section>
  );
}

function SeriesCompactPanel({
  series,
  selectedSeriesId,
  onSelect,
}: {
  series: ReadingSeries[];
  selectedSeriesId: string;
  onSelect: (seriesId: string) => void;
}) {
  return (
    <section className="series-compact-panel teacher-primary-card" aria-labelledby="series-compact-title">
      <div className="series-compact-header">
        <div>
          <p className="section-kicker">Unterrichtsserien</p>
          <h3 id="series-compact-title">Heute eine ruhige Serie vormerken</h3>
          <p>Hier nur Serie vormerken. Der Kinderpfad ändert sich erst unten bei der manuellen Tagesweg-Wahl.</p>
        </div>
        <span className="guided-path-badge">lokal · Vorschau</span>
      </div>
      <div className="series-row-grid" aria-label="Unterrichtsserien vormerken">
        {series.map((item, index) => (
          <article className={selectedSeriesId === item.id ? 'series-row selected' : 'series-row'} key={item.id}>
            <div className="series-row-title">
              <span>Serie {index + 1} · {item.materialLabels.length} Aufgabe{item.materialLabels.length === 1 ? '' : 'n'}</span>
              <strong>{item.title}</strong>
              {item.recommendation ? <em>heute naheliegend</em> : null}
            </div>
            <dl className="series-row-steps">
              <div><dt>Start</dt><dd>{item.startLabel}</dd></div>
              <div><dt>Wiederholung</dt><dd>{item.repeatLabel}</dd></div>
              <div><dt>Nächster Schritt</dt><dd>{item.nextStepLabel}</dd></div>
            </dl>
            <div className="series-example-card" aria-label={`Beispielmaterial für ${item.title}`}>
              <div className="series-example-symbol" aria-hidden="true">{item.exampleMaterial.symbol}</div>
              <div>
                <p className="series-example-label">{item.exampleMaterial.label}</p>
                <p className="series-example-chain">
                  <span>{item.exampleMaterial.visual}</span>
                  <span>{item.exampleMaterial.syllable}</span>
                  <strong>{item.exampleMaterial.word}</strong>
                  <span>{item.exampleMaterial.sentence}</span>
                </p>
                <p className="series-example-story">{item.exampleMaterial.miniStory}</p>
                <p className="series-example-help">Hilfe: {item.exampleMaterial.help}</p>
              </div>
            </div>
            <p className="series-row-support">{item.supportLabel} · {item.omitLabel}</p>
            <p className="series-row-materials">Darin: {item.materialLabels.join(' · ')}</p>
            <button
              aria-pressed={selectedSeriesId === item.id}
              className={selectedSeriesId === item.id ? 'secondary-action series-mark-action selected' : 'secondary-action series-mark-action'}
              onClick={() => onSelect(item.id)}
              type="button"
            >
              {selectedSeriesId === item.id ? 'Vorgemerkt – noch nicht im Tagesweg' : 'Serie vormerken'}
            </button>
          </article>
        ))}
      </div>
      <p className="privacy-hint">Keine automatische Umstellung: Eine Vormerkung schreibt nicht in den Tagesweg. Die Tageskarten werden darunter bewusst manuell gewählt.</p>
    </section>
  );
}

function GuidedReadingPath({ chain, activeIndex = 0, orientationSteps }: { chain: ReturnType<typeof getGuidedReadingChain>; activeIndex?: number; orientationSteps?: ReturnType<typeof getChildOrientationSteps> }) {
  const currentStep = chain.steps[activeIndex] ?? chain.steps[0];
  const nextStep = chain.steps[Math.min(activeIndex + 1, chain.steps.length - 1)] ?? currentStep;
  const transitionCue = getGuidedReadingTransitionCue(chain, activeIndex);

  return (
    <section className="guided-path-panel" aria-labelledby="guided-path-title">
      <div className="guided-path-header">
        <div>
          <p className="section-kicker">Leseleiter</p>
          <h3 id="guided-path-title">Heute lesen wir so</h3>
        </div>
        <span className="guided-path-badge">lokal</span>
      </div>
      <div className="child-progress-strip" aria-label={`Aktueller Leseschritt ${activeIndex + 1} von ${chain.steps.length}: ${currentStep.label}`}>
        <div className="child-progress-status">
          <strong>Mein Leseweg</strong>
          <em>Jetzt lesen: {currentStep.label}</em>
          <span className="child-progress-next">Danach: {nextStep.label}</span>
        </div>
        <div className="child-progress-steps" aria-label="Leseweg: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke">
          {['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte', 'Schreibbrücke'].map((label, index) => (
            <span
              aria-current={index === activeIndex ? 'step' : undefined}
              className={index === activeIndex ? 'child-progress-pill current' : index === activeIndex + 1 ? 'child-progress-pill next' : 'child-progress-pill'}
              key={label}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <aside className="guided-transition-card" aria-label="Mein nächster Schritt">
        <strong>{transitionCue.title}</strong>
        <div className="guided-transition-actions">
          <span><em>{transitionCue.nowLabel}</em>{transitionCue.nowAction}</span>
          <span><em>{transitionCue.nextLabel}</em>{transitionCue.nextAction}</span>
        </div>
        <p>{transitionCue.childSentence}</p>
      </aside>
      <ol className="guided-step-list step-rail leseleiter-list" aria-label="Tagespfad Schrittleiste: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke">
        {chain.steps.map((step, index) => {
          const orientation = orientationSteps?.[index];
          return (
            <li className={index === activeIndex ? 'current' : index < activeIndex ? 'done' : ''} key={step.id}>
              <span aria-hidden="true" className="step-dot">{index + 1}</span>
              <strong>{step.label}</strong>
              <span>{orientation?.childText ?? `${step.label}: ${step.helper}`}</span>
            </li>
          );
        })}
      </ol>
      <div className="guided-worked-chain" aria-label={`Beispielkette ${chain.word}`}>
        <span>Bild</span>
        <span className="chain-arrow" aria-hidden="true">→</span>
        <span className="chain-syllables">
          {chain.syllables.map((part: { text: string; color: string }, index: number) => (
            <span className={`syllable ${part.color}`} key={`${chain.word}-${index}`}>{part.text}</span>
          ))}
        </span>
        <span className="chain-arrow" aria-hidden="true">→</span>
        <span className="chain-word">{chain.word}</span>
        <span className="chain-arrow" aria-hidden="true">→</span>
        <span>{chain.sentence}</span>
        <span className="chain-arrow" aria-hidden="true">→</span>
        <span>{chain.storyTitle}</span>
        <span className="chain-arrow" aria-hidden="true">→</span>
        <span>Schreibbrücke</span>
      </div>
    </section>
  );
}

function Leseleiter({ profile }: { profile?: ReturnType<typeof getTaskDevelopmentProfile> }) {
  const steps = ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte', 'Schreibbrücke'];
  const currentLabel = profile?.entryLayer === 'symbol' || profile?.entryLayer === 'picture'
    ? 'Bild'
    : profile?.entryLayer === 'syllable'
      ? 'Silbe'
      : profile?.entryLayer === 'sentence'
        ? 'Satz'
        : 'Wort';
  const currentIndex = Math.max(0, steps.indexOf(currentLabel));
  const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)];

  return (
    <section className="leseleiter-panel" aria-label="Leseleiter Orientierung">
      <div className="leseleiter-title-row">
        <strong>Heute lesen wir so</strong>
        <span>Jetzt: {currentLabel} · Danach: {nextStep}</span>
      </div>
      <ol className="leseleiter-steps">
        {steps.map((step, index) => (
          <li className={index === currentIndex ? 'active' : index < currentIndex ? 'done' : ''} key={step}>
            <span aria-hidden="true">{index + 1}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WritingBridgeCard({ bridge }: { bridge?: ReturnType<typeof getWritingBridgeForTask> }) {
  if (!bridge) return null;
  return (
    <aside className="writing-bridge-card" aria-label="Optionale Schreibbrücke">
      <div>
        <p className="section-kicker">Optional</p>
        <h3>{bridge.title}</h3>
        <p>{bridge.childPrompt}</p>
      </div>
      <div className="writing-bridge-material" aria-label={`Materialspur für ${bridge.word}`}>
        <span className="writing-bridge-chip">Legen</span>
        <strong>{bridge.word}</strong>
        <span className="writing-bridge-trace">Finger-Spur</span>
      </div>
      <span>Nur wenn es heute passt. Kein Speichern, keine Bewertung.</span>
    </aside>
  );
}


type GuidedStep = ReturnType<typeof getGuidedReadingChain>['steps'][number];

function MamaStepCard({
  chain,
  stepIndex,
  onFinish,
  onNext,
  onReset,
}: {
  chain: ReturnType<typeof getGuidedReadingChain>;
  stepIndex: number;
  onFinish: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  const activeStep = chain.steps[stepIndex] ?? chain.steps[0];
  const isLastStep = stepIndex >= chain.steps.length - 1;

  return (
    <section className="mama-step-card" aria-labelledby="mama-step-title">
      <div className="mama-step-topline">
        <p className="section-kicker">Schrittkarte Mama</p>
        <span>{stepIndex + 1} von {chain.steps.length}</span>
      </div>
      <h3 id="mama-step-title">{activeStep.label}</h3>
      <MamaStepContent step={activeStep} chain={chain} />
      <div className="mama-step-actions" aria-label="Schrittkarte steuern">
        <button className="primary-action" onClick={isLastStep ? onFinish : onNext} type="button">
          {isLastStep ? 'Heute fertig' : 'Weiter'}
        </button>
        <button className="secondary-action" onClick={onReset} type="button">
          Nochmal ruhig
        </button>
      </div>
    </section>
  );
}

function MamaStepContent({ step, chain }: { step: GuidedStep; chain: ReturnType<typeof getGuidedReadingChain> }) {
  if (step.id === 'picture') {
    return <p className="mama-step-text">Bild anschauen. Wort zeigen.</p>;
  }

  if (step.id === 'word') {
    return <p className="mama-focus-word">{chain.word}</p>;
  }

  if (step.id === 'syllables') {
    return (
      <div className="mama-focus-syllables" aria-label="Silben Ma und ma">
        {chain.syllables.map((part: { text: string; color: string }, index: number) => (
          <span className={`syllable ${part.color}`} key={`mama-step-${index}`}>{part.text}</span>
        ))}
      </div>
    );
  }

  if (step.id === 'build') {
    return (
      <p className="mama-build-word">
        {chain.syllables.map((part: { text: string }) => part.text).join('')} <span>{chain.word}</span>
      </p>
    );
  }

  if (step.id === 'sentence') {
    return <p className="mama-step-text">{chain.sentence}</p>;
  }

  if (step.id === 'writing') {
    return (
      <div className="mama-writing-scaffold" aria-label={`Schreibbrücke für ${chain.word}`}>
        <span>1. Silben legen</span>
        <strong>{chain.syllables.map((part: { text: string }) => part.text).join(' · ')}</strong>
        <span>2. Wort ruhig nachfahren</span>
        <p>{chain.word}</p>
      </div>
    );
  }

  if (step.id === 'story') {
    return (
      <div className="mama-mini-story">
        <div className="mini-story-scene" aria-label={`Mini-Szene zu ${chain.word}`}>
          <span className="mini-story-picture" aria-hidden="true">{chain.word.slice(0, 1)}</span>
          <strong>{chain.word}</strong>
          <span>{chain.sentence}</span>
        </div>
        {chain.storyText.map((line: string) => <p key={line}>{line}</p>)}
      </div>
    );
  }

  return <p className="mama-step-text">{step.helper}</p>;
}

function FocusGameShell({
  active,
  started,
  title,
  startText,
  helperText,
  success = false,
  children,
  onStart,
  onExit,
  focusClassName,
}: {
  active: boolean;
  started: boolean;
  title: string;
  startText: string;
  helperText: string;
  success?: boolean;
  children: ReactNode;
  onStart: () => void;
  onExit: () => void;
  focusClassName?: string;
}) {
  const shellRef = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  async function startFocus() {
    onStart();
    if (shellRef.current?.requestFullscreen) {
      try {
        await shellRef.current.requestFullscreen();
      } catch {
        setIsFullscreen(false);
      }
    }
  }

  const shellClassName = [
    'focus-game-shell',
    active && started ? 'focus-game-shell-playing' : active ? '' : 'focus-game-shell-inline',
    active && !started ? 'focus-game-shell-ready' : '',
    isFullscreen ? 'is-fullscreen' : '',
    focusClassName ?? '',
  ].filter(Boolean).join(' ');
  const startSymbol = title.includes('Mission') ? '🎁' : title.includes('Reise') ? '🚀' : title.includes('Wortpost') ? '✉️' : '📅';
  const startCue = title.includes('Mission')
    ? 'Karte anschauen. Wort lesen.'
    : title.includes('Reise')
      ? 'Bild. Silbe. Wort. Satz.'
      : title.includes('Wortpost')
        ? 'Wort zur Karte bringen.'
        : 'Schau. Klatsch. Lies.';

  if (!active) return <>{children}</>;

  return (
    <section className={shellClassName} ref={shellRef} aria-labelledby="focus-shell-title">
      <div className="focus-shell-bar">
        <div>
          <p className="section-kicker">Spielraum</p>
          <strong id="focus-shell-title">{title}</strong>
          <span>{helperText}</span>
        </div>
        <button className="focus-exit-action" onClick={onExit} type="button">
          Zur Lehrkraft
        </button>
      </div>
      {started ? (
        <div className="focus-shell-content">
          {children}
          {success ? <p className="focus-success-note">Heute geschafft. Du darfst ruhig fertig sein.</p> : null}
        </div>
      ) : (
        <div className="focus-start-card">
          <span className="focus-start-symbol" aria-hidden="true">{startSymbol}</span>
          <p className="section-kicker">Bereit</p>
          <h2>{title}</h2>
          <p className="focus-start-cue">{startCue}</p>
          <button className="primary-action" onClick={startFocus} type="button">
            {startText}
          </button>
        </div>
      )}
    </section>
  );
}

function SupportPanel({ support, onToggle }: { support: SupportState; onToggle: (key: SupportKey) => void }) {
  return (
    <div className="support-grid">
      {supportOptions.map((option) => (
        <button
          aria-pressed={Boolean(support[option.id])}
          className={support[option.id] ? 'support-button selected' : 'support-button'}
          key={option.id}
          onClick={() => onToggle(option.id)}
          type="button"
        >
          <strong>{option.label}</strong>
          <span>{option.description}</span>
        </button>
      ))}
    </div>
  );
}

function ActiveSupport({ labels }: { labels: string[] }) {
  return (
    <div className="active-support" aria-label="Aktive Hilfen">
      <strong>Aktiv:</strong>
      {labels.length > 0 ? labels.map((label) => <span key={label}>{label}</span>) : <span>noch keine Hilfe</span>}
    </div>
  );
}

function ChildRecommendation({ text }: { text: string }) {
  return <p className="child-recommendation">{text}</p>;
}

function SymbolHelpCard({ symbolHelp }: { symbolHelp: Task['symbolHelp'] }) {
  const cue = symbolHelp.cue;

  return (
    <div
      aria-label={symbolHelp.altText}
      className={`symbol-help-card tone-${cue.tone} shape-${cue.shape}`}
      role="img"
    >
      <span aria-hidden="true" className="symbol-help-token">{cue.token}</span>
      <strong>{symbolHelp.label}</strong>
      <span className="symbol-help-caption">lokale Symbolhilfe</span>
    </div>
  );
}

function GestureHint({ gestureHint }: { gestureHint: Task['gestureHint'] }) {
  return (
    <aside className="gesture-hint" aria-label={gestureHint.label}>
      <strong>{gestureHint.label}</strong>
      <span>{gestureHint.text}</span>
      <small>{gestureHint.readingSupportText}</small>
    </aside>
  );
}

function StoryCard({ story, supportState, onAnswer }: { story: Story; supportState: ReturnType<typeof normalizeSupportState>; onAnswer: (answer: string) => void }) {
  const showStorySupports = supportState.imageHelp || (supportState.syllableColors && story.supportSyllables.length > 0);

  return (
    <article className="reading-card story-card">
      <div className="story-meta">
        <p className="section-kicker">Mini-Story</p>
        <h3>{story.title}</h3>
        <span>{story.targetSkill}</span>
      </div>
      <div className="story-text" aria-label={`Lesetext ${story.title}`}>
        {story.text.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {showStorySupports ? (
        <div className="story-support-row" aria-label="Lesehilfen zur Story">
          {supportState.imageHelp ? <SymbolHelpCard symbolHelp={story.symbolHelp} /> : null}
          {supportState.syllableColors && story.supportSyllables.length > 0 ? (
            <div className="story-syllable-cue" aria-label={`Stützwort ${story.focusWord}`}>
              {story.supportSyllables.map((syllable: { text: string; color: string }, index: number) => (
                <span className={`syllable ${syllable.color}`} key={`${story.id}-support-${index}`}>
                  {syllable.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {supportState.readAloud ? <p className="helper-hint">Lehrkraft liest bei Bedarf kurz vor. Danach liest du in Ruhe.</p> : null}
      {supportState.signHint ? <GestureHint gestureHint={story.gestureHint} /> : null}
      <div className="story-question">
        <p className="task-prompt">{story.comprehensionPrompt}</p>
        <StoryAnswerChoices story={story} onAnswer={onAnswer} />
      </div>
    </article>
  );
}

function StoryAnswerChoices({ story, onAnswer }: { story: Story; onAnswer: (answer: string) => void }) {
  return (
    <div className="story-answer-grid" aria-label="Antwort zur Story wählen">
      {story.reducedChoice.options.slice(0, 2).map((option: string) => (
        <button key={option} onClick={() => onAnswer(option)} type="button">
          {option}
        </button>
      ))}
    </div>
  );
}

function StoryFocusStage({
  story,
  cardIndex,
  totalCards,
  supportState,
  onAnswer,
}: {
  story: Story;
  cardIndex: number;
  totalCards: number;
  supportState: ReturnType<typeof normalizeSupportState>;
  onAnswer: (answer: string) => void;
}) {
  const [selectedStoryAnswer, setSelectedStoryAnswer] = useState<string | null>(null);
  const selectedIsAnswer = selectedStoryAnswer === story.reducedChoice.answer;

  useEffect(() => {
    setSelectedStoryAnswer(null);
  }, [story.id]);

  return (
    <article className="focus-stage-card story-focus-stage" aria-labelledby="story-focus-title">
      <p className="focus-progress-cue">Runde {cardIndex + 1} von {totalCards}</p>
      <div className="story-meta">
        <p className="section-kicker">Mini-Story</p>
        <h2 id="story-focus-title">{story.title}</h2>
      </div>
      <div className="story-focus-play-scene">
        {supportState.imageHelp ? (
          <div className="story-focus-symbol-stage">
            <SymbolHelpCard symbolHelp={story.symbolHelp} />
          </div>
        ) : null}
        <div className="story-text story-focus-text story-focus-lines" aria-label={`Lesetext ${story.title}`}>
          {story.text.map((line: string) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      {supportState.syllableColors && story.supportSyllables.length > 0 ? (
        <div className="story-syllable-cue" aria-label={`Stützwort ${story.focusWord}`}>
          {story.supportSyllables.map((syllable: { text: string; color: string }, index: number) => (
            <span className={`syllable ${syllable.color}`} key={`${story.id}-focus-support-${index}`}>
              {syllable.text}
            </span>
          ))}
        </div>
      ) : null}
      <div className="story-question story-focus-question">
        <p className="task-prompt">{story.comprehensionPrompt}</p>
        <div className="story-focus-answer-grid" aria-label="Antwort zur Story wählen">
          {story.reducedChoice.options.slice(0, 2).map((option: string) => (
            <button
              aria-pressed={selectedStoryAnswer === option}
              className={`story-focus-answer-card ${selectedStoryAnswer === option ? 'selected' : ''}`}
              key={option}
              onClick={() => setSelectedStoryAnswer(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
        {selectedStoryAnswer ? (
          <>
            <p className={`story-focus-feedback ${selectedIsAnswer ? 'is-calm-success' : 'is-calm-support'}`} aria-live="polite">
              {selectedIsAnswer ? 'Das passt.' : 'Schau noch einmal in die Story.'}
            </p>
            <button className="story-focus-next-action" onClick={() => onAnswer(selectedStoryAnswer)} type="button">
              Weiter
            </button>
          </>
        ) : null}
      </div>
    </article>
  );
}

function getWortpostHelpLabel(help: WortpostHelpKey | null) {
  if (help === 'silben') return 'Heute sichtbar: Silben zeigen';
  if (help === 'kleine-auswahl') return 'Heute sichtbar: weniger Auswahl';
  if (help === 'vormachen') return 'Heute sichtbar: Vormachen-Hilfe';
  return 'Heute sichtbar: Grundhilfe ohne Zusatzschalter';
}

function getWortpostDefaultLabels(defaults: WortpostHelpDefaults) {
  const labels = [];
  if (defaults.silben) labels.push('Silben sichtbar');
  if (defaults['kleine-auswahl']) labels.push('kleine Auswahl');
  if (defaults.vormachen) labels.push('Vormachen bei Bedarf');
  return labels.length > 0 ? labels : ['keine Zusatzhilfe vorausgewählt'];
}

function WortpostJourney({ cardIndex, totalCards, completedAll = false }: { cardIndex: number; totalCards: number; completedAll?: boolean }) {
  return (
    <div className="wortpost-journey" aria-label={`Wortpost Weg: Post ${Math.min(cardIndex + 1, totalCards)} von ${totalCards}`}>
      {Array.from({ length: totalCards }).map((_, index) => {
        const done = completedAll || index < cardIndex;
        const current = !completedAll && index === cardIndex;
        return (
          <span className={done ? 'done' : current ? 'current' : ''} key={`wortpost-stop-${index}`}>
            <small>{done ? '✓' : '✉'}</small>
            Post {index + 1}
          </span>
        );
      })}
    </div>
  );
}

function WortpostStage({
  activeTask,
  cardIndex,
  totalCards,
  supportState,
  tasks,
  visibleHelp,
  developmentStage,
  onHelp,
  onAnswer,
}: {
  activeTask: Task;
  cardIndex: number;
  totalCards: number;
  supportState: ReturnType<typeof normalizeSupportState>;
  tasks: Task[];
  visibleHelp: WortpostHelpKey | null;
  developmentStage: ReturnType<typeof getWortpostDevelopmentStage>;
  onHelp: (help: WortpostHelpKey) => void;
  onAnswer: (answer: string) => void;
}) {
  const targetCount = supportState.reduceChoices ? 2 : 3;
  const targetWords = [activeTask.word, ...activeTask.options.filter((option: string) => option !== activeTask.word)];
  const targetTasks = targetWords.reduce((selected: Task[], word: string) => {
    if (selected.length >= targetCount) return selected;
    const task = tasks.find((candidate) => candidate.word === word);
    if (task && !selected.some((item: Task) => item.word === task.word)) selected.push(task);
    return selected;
  }, [] as Task[]);
  for (const task of tasks) {
    if (targetTasks.length >= targetCount) break;
    if (task.word !== activeTask.word && !targetTasks.some((item: Task) => item.word === task.word)) targetTasks.push(task);
  }

  return (
    <article className="focus-stage-card wortpost-stage-card" aria-labelledby="wortpost-stage-title">
      <p className="focus-progress-cue">Post {cardIndex + 1} von {totalCards}</p>
      <WortpostJourney cardIndex={cardIndex} totalCards={totalCards} />
      <div className="wortpost-play-scene" aria-label="Wortpost Spielraum">
        <div className="wortpost-scene-sky" aria-hidden="true">
          <span>Postweg</span>
          <span>Lesegarten</span>
        </div>
        <div className="wortpost-word-card" aria-label={`Wortkarte ${activeTask.word}`}>
          <p className="section-kicker">Wortkarte</p>
          <h2 id="wortpost-stage-title">{activeTask.word}</h2>
          {supportState.syllableColors ? (
            <div className="syllable-word wortpost-syllables" aria-label={`Silbenhilfe ${activeTask.word}`}>
              {activeTask.syllables.map((syllable: { text: string; color: string }, index: number) => (
                <span className={`syllable ${syllable.color}`} key={`${activeTask.id}-wortpost-${index}`}>{syllable.text}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="wortpost-route" aria-hidden="true">
          <span className="route-dot" />
          <span className="route-line" />
          <span className="route-envelope">✉</span>
        </div>
        <div className="wortpost-learning-steps" aria-label="Leseweg: Symbol, Silbe, Wort">
          <span className="active"><small>1</small> Symbol ansehen</span>
          <span className={supportState.syllableColors ? 'active' : ''}><small>2</small> Silben hören</span>
          <span className="active"><small>3</small> Wort zum Postfach</span>
        </div>
        <p className="wortpost-stage-orientation">{developmentStage.orientation}</p>
        <p className="focus-stage-prompt">Wohin geht die Wortpost?</p>
        <div className="wortpost-help-actions" aria-label="Wortpost-Hilfe wählen">
          <button className={visibleHelp === 'silben' ? 'active' : ''} onClick={() => onHelp('silben')} type="button">
            Silben zeigen
          </button>
          <button className={visibleHelp === 'kleine-auswahl' ? 'active' : ''} onClick={() => onHelp('kleine-auswahl')} type="button">
            Weniger Auswahl
          </button>
          <button className={visibleHelp === 'vormachen' ? 'active' : ''} onClick={() => onHelp('vormachen')} type="button">
            Vormachen
          </button>
        </div>
        <div className="wortpost-help-row" aria-label="Heute sichtbare Hilfen">
          <span className={supportState.reduceChoices ? 'active' : ''}>Kleine Auswahl</span>
          <span className={supportState.syllableColors ? 'active' : ''}>Silben sichtbar</span>
          <span className={supportState.signHint ? 'active' : ''}>Gebärde / Vormachen</span>
        </div>
        {visibleHelp ? <p className="wortpost-visible-help-note">{getWortpostHelpLabel(visibleHelp)}.</p> : null}
        {supportState.signHint ? <GestureHint gestureHint={activeTask.gestureHint} /> : null}
        <div className={`wortpost-target-grid ${supportState.reduceChoices ? 'reduced' : ''}`} aria-label="Wortpost-Ziele antippen">
          {targetTasks.map((task: Task) => (
            <button className="wortpost-target" key={`${activeTask.id}-${task.word}`} onClick={() => onAnswer(task.word)} type="button">
              <span className="postbox-label">Postfach</span>
              <SymbolHelpCard symbolHelp={task.symbolHelp} />
              <strong>{task.word}</strong>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function WortpostFeedback({
  activeTask,
  answer,
  cardIndex,
  totalCards,
  onAgain,
  onContinue,
  onTeacher,
  sentenceBridge,
}: {
  activeTask: Task;
  answer: string | null;
  cardIndex: number;
  totalCards: number;
  onAgain: () => void;
  onContinue: () => void;
  onTeacher: () => void;
  sentenceBridge?: string;
}) {
  const arrived = answer === activeTask.word;
  const isLast = cardIndex >= totalCards - 1;

  return (
    <article className="feedback-card wortpost-feedback-card">
      <WortpostJourney cardIndex={cardIndex} totalCards={totalCards} />
      <div className={arrived ? 'wortpost-arrival-card arrived' : 'wortpost-arrival-card retry'}>
        <div className="wortpost-arrival-route" aria-hidden="true">
          <span className="arrival-envelope">✉</span>
          <span className="arrival-line" />
          <span className="arrival-postbox">▣</span>
        </div>
        <p>{arrived ? 'Die Wortpost ist angekommen.' : 'Wir schauen noch einmal in Ruhe.'}</p>
        <small>{arrived ? `Postfach ${activeTask.word}: Der Brief liegt richtig.` : `Die Wortkarte ${activeTask.word} darf noch einmal langsam zum Postfach.`}</small>
        {arrived && sentenceBridge ? <p className="wortpost-sentence-bridge">{sentenceBridge}</p> : null}
      </div>
      <p className="pilot-progress">Wortpost {cardIndex + 1} von {totalCards}: {activeTask.word}</p>
      <div className="next-choice-grid pilot-next-grid" aria-label="Wortpost fortsetzen">
        <button onClick={onAgain} type="button">Nochmal</button>
        {!isLast ? <button onClick={onContinue} type="button">Weiter</button> : null}
        <button onClick={isLast ? onContinue : onTeacher} type="button">{isLast ? 'Fertig' : 'Zur Lehrkraft'}</button>
      </div>
    </article>
  );
}

function PilotFocusStage({
  activeTask,
  cardIndex,
  totalCards,
  supportState,
  onFinish,
  progressLabel = 'Karte',
}: {
  activeTask: Task;
  cardIndex: number;
  totalCards: number;
  supportState: ReturnType<typeof normalizeSupportState>;
  onFinish: () => void;
  progressLabel?: string;
}) {
  return (
    <article className="focus-stage-card pilot-stage-card" aria-labelledby="pilot-stage-title">
      <p className="focus-progress-cue">{progressLabel} {cardIndex + 1} von {totalCards}</p>
      <h2 id="pilot-stage-title">{activeTask.word}</h2>
      <p className="focus-stage-prompt">{activeTask.prompt}</p>
      {supportState.imageHelp ? <SymbolHelpCard symbolHelp={activeTask.symbolHelp} /> : null}
      <div className="syllable-word focus-word" aria-label={`Lesewort ${activeTask.word}`}>
        {activeTask.syllables.map((syllable: { text: string; color: string }, index: number) => (
          <span
            className={supportState.syllableColors ? `syllable ${syllable.color}` : 'syllable plain'}
            key={`${activeTask.id}-focus-${index}`}
          >
            {syllable.text}
          </span>
        ))}
      </div>
      {supportState.signHint ? <GestureHint gestureHint={activeTask.gestureHint} /> : null}
      <button className="primary-action focus-done-action" onClick={onFinish} type="button">
        Fertig
      </button>
    </article>
  );
}

function GuidedFocusStage({
  chain,
  stepIndex,
  onFinish,
  onNext,
  onReset,
}: {
  chain: ReturnType<typeof getGuidedReadingChain>;
  stepIndex: number;
  onFinish: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  const activeStep = chain.steps[stepIndex] ?? chain.steps[0];
  const isLastStep = stepIndex >= chain.steps.length - 1;
  const stepSymbol = {
    picture: '🖼️',
    syllables: '👏',
    word: '🔤',
    sentence: '💬',
    story: '📖',
    writing: '✍️',
  }[activeStep.id] ?? '⭐';
  const actionCue = {
    picture: 'Schau genau.',
    syllables: 'Klatsch mit.',
    word: 'Lies ruhig.',
    sentence: 'Lies den Satz.',
    story: 'Hör und schau.',
    writing: 'Spur nach.',
  }[activeStep.id] ?? activeStep.helper;

  return (
    <article className="focus-stage-card guided-stage-card" aria-labelledby="guided-stage-title">
      <p className="focus-progress-cue">Schritt {stepIndex + 1} von {chain.steps.length}</p>
      <div className="guided-stage-symbol" aria-hidden="true">{stepSymbol}</div>
      <h2 id="guided-stage-title">{activeStep.label}</h2>
      <div className="guided-stage-main-action">
        <MamaStepContent step={activeStep} chain={chain} />
      </div>
      <p className="focus-stage-prompt">{actionCue}</p>
      <div className="focus-action-row" aria-label="Tagespfad steuern">
        <button className="primary-action focus-done-action" onClick={isLastStep ? onFinish : onNext} type="button">
          {isLastStep ? 'Fertig' : 'Weiter'}
        </button>
        <button className="secondary-action" onClick={onReset} type="button">
          Nochmal
        </button>
      </div>
    </article>
  );
}

function PilotFeedback({ activeTask, onContinue }: { activeTask: Task; onContinue: () => void }) {
  return (
    <article className="feedback-card pilot-feedback-card">
      <p>Gut gelesen: {activeTask.word}</p>
      <p className="pilot-progress">Eine Karte ist fertig. Jetzt kommt Karte 2.</p>
      <div className="next-choice-grid pilot-next-grid" aria-label="Pilot fortsetzen">
        <button onClick={onContinue} type="button">Weiter zur zweiten Karte</button>
      </div>
    </article>
  );
}

function SequenceFeedback({
  activeLabel,
  cardIndex,
  totalCards,
  onAgain,
  onContinue,
  onTeacher,
}: {
  activeLabel: string;
  cardIndex: number;
  totalCards: number;
  onAgain: () => void;
  onContinue: () => void;
  onTeacher: () => void;
}) {
  const isLast = cardIndex >= totalCards - 1;

  return (
    <article className="feedback-card sequence-feedback-card">
      <p>Gut gelesen: {activeLabel}</p>
      <p className="pilot-progress">Runde {cardIndex + 1} von {totalCards} ist fertig.</p>
      <div className="next-choice-grid pilot-next-grid" aria-label="Auswahl-Spiel fortsetzen">
        <button onClick={onAgain} type="button">Nochmal</button>
        {!isLast ? <button onClick={onContinue} type="button">Weiter</button> : null}
        <button onClick={isLast ? onContinue : onTeacher} type="button">{isLast ? 'Fertig' : 'Zur Lehrkraft'}</button>
      </div>
    </article>
  );
}

function FeedbackChoices({
  activeTask,
  activeStory,
  readingMode,
  onChoice,
}: {
  activeTask: Task;
  activeStory: Story;
  readingMode: ReadingMode;
  onChoice: (choice: 'Nochmal' | 'Weiter' | 'Fertig') => void;
}) {
  const feedbackText = readingMode === 'story' ? activeStory.supportiveFeedback : `Dein Wort war: ${activeTask.word}`;
  const choiceHints: Record<'Nochmal' | 'Weiter' | 'Fertig', string> = {
    Nochmal: 'Du kannst es noch einmal lesen.',
    Weiter: 'Du darfst weitergehen.',
    Fertig: 'Du bist fertig.',
  };

  return (
    <article className="feedback-card">
      <p>{feedbackText}</p>
      <div className="next-choice-grid" aria-label="Nächsten Schritt wählen">
        {(['Nochmal', 'Weiter', 'Fertig'] as const).map((choice) => (
          <button key={choice} onClick={() => onChoice(choice)} type="button">
            <strong>{choice}</strong>
            <span>{choiceHints[choice]}</span>
          </button>
        ))}
      </div>
    </article>
  );
}


function ObjectFamilyMiniMomentStage({
  slice,
  onFinish,
  onTeacher,
}: {
  slice: ReturnType<typeof getObjectFamilyMiniSlice>;
  onFinish: () => void;
  onTeacher: () => void;
}) {
  const moment = slice.childMiniMoment;
  const interaction = moment.interaction;
  const [selectedInteractionOption, setSelectedInteractionOption] = useState<string | null>(null);
  const selectedOption = interaction.options.find((option) => option.id === selectedInteractionOption);

  return (
    <article className="focus-stage-card object-family-mini-moment-stage" aria-labelledby="object-family-mini-moment-title">
      <p className="section-kicker">Genau ein Mini-Moment</p>
      <h2 id="object-family-mini-moment-title">Teller ist auf dem Tisch</h2>
      <div className="object-family-orientation-card" aria-label="Teller-Moment Orientierung">
        <strong>Was liegt auf dem Tisch?</strong>
        <span>{moment.orientation}</span>
      </div>
      <div className="object-family-scene" aria-label="Tischszene mit Teller und Tasse">
        <div className="object-family-sofa" aria-hidden="true"><span /></div>
        <div className="object-family-table" aria-hidden="true">
          <span className="object-family-cup" />
          <span className="object-family-plate" />
        </div>
      </div>
      <div className="object-family-play-panel" aria-label="Teller-Spielhandlung">
        <section className="object-family-interaction-card" aria-label="Teller und Tasse unterscheiden">
          <strong>{interaction.prompt}</strong>
          <div className="object-family-option-grid" aria-label="Zwei ruhige Optionen">
            {interaction.options.map((option) => (
              <button
                aria-pressed={selectedInteractionOption === option.id}
                className={selectedInteractionOption === option.id ? 'object-family-option-selected' : ''}
                key={option.id}
                onClick={() => setSelectedInteractionOption(option.id)}
                type="button"
              >
                <span className={`object-family-option-symbol object-family-option-symbol-${option.id}`} aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {selectedOption ? <p className="object-family-feedback" aria-live="polite">{selectedOption.feedback}</p> : null}
          {selectedOption ? (
            <button className="object-family-again-button" onClick={() => setSelectedInteractionOption(null)} type="button">
              Nochmal
            </button>
          ) : null}
        </section>
      </div>
      <div className="object-family-learning-trail" aria-label="Ruhige Lernspur Bild Silbe Wort Satz Mini-Geschichte">
        <div className="object-family-layer-grid" aria-label="Bild Silbe Wort Satz klar getrennt">
          <div><strong>Bild</strong><span>Teller auf dem Tisch</span></div>
          <div><strong>Silbe</strong><span>Tel - ler</span></div>
          <div><strong>Wort</strong><span>Teller</span></div>
          <div><strong>Satz</strong><span>{moment.sentence}</span></div>
        </div>
        <ol className="object-family-step-path" aria-label="Bild Silbe Wort Satz Mini-Geschichte">
          {moment.steps.map((step) => (
            <li key={step.label}>
              <strong>{step.label}</strong>
              <span>{step.childPrompt}</span>
              <em>{step.cue}</em>
            </li>
          ))}
        </ol>
        <p className="object-family-sentence-card">Der Teller ist auf dem Tisch.</p>
      </div>
      <p className="privacy-hint">Ein ruhiger Anschluss aus Sofa, Tisch, Tasse und Teller. Lokal, ohne Uhr und ohne Speicherung.</p>
      <div className="next-choice-grid pilot-next-grid" aria-label="Objekt-Moment abschließen">
        <button onClick={onFinish} type="button">Fertig</button>
        <button onClick={onTeacher} type="button">Zur Lehrkraft</button>
      </div>
    </article>
  );
}


function MiniJourneyPrepStage({
  step,
  stepIndex,
  totalSteps,
  onAgain,
  onNext,
  onTeacher,
}: {
  step: ReturnType<typeof getMiniJourneyPrepSequence>[number];
  stepIndex: number;
  totalSteps: number;
  onAgain: () => void;
  onNext: () => void;
  onTeacher: () => void;
}) {
  const isLast = stepIndex >= totalSteps - 1;
  const syllables = step.anchorWord === 'Tasse' ? ['Tas', 'se'] : ['So', 'fa'];
  return (
    <article className="focus-stage-card mini-journey-prep-scene" aria-labelledby="mini-journey-prep-title">
      <ol className="mini-journey-prep-path" aria-label={`${step.prepTitle} Schritte`}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <li
            aria-current={index === stepIndex ? 'step' : undefined}
            className={index === stepIndex ? 'mini-journey-prep-path-current' : index < stepIndex ? 'mini-journey-prep-path-done' : ''}
            key={`${step.anchorWord}-prep-path-${index}`}
          >
            <span>{index + 1}</span>
          </li>
        ))}
      </ol>
      <div className="mini-journey-prep-card-row">
        <div className={`mini-journey-prep-symbol-anchor mini-journey-prep-symbol--${step.anchorWord.toLowerCase()}`} aria-label={`Bildhafter Symbolanker ${step.anchorWord}`}>
          <div className="mini-journey-symbol-tile" aria-hidden="true">
            {syllables.map((syllable) => <span key={`${step.anchorWord}-prep-${syllable}`}>{syllable}</span>)}
          </div>
          {step.anchorWord === 'Tasse' ? (
            <div className="mini-journey-symbol mini-journey-symbol--tasse" aria-hidden="true">
              <span className="mini-journey-cup-bowl" />
              <span className="mini-journey-cup-handle" />
              <span className="mini-journey-cup-saucer" />
            </div>
          ) : (
            <div className="mini-journey-symbol mini-journey-symbol--sofa" aria-hidden="true">
              <span className="mini-journey-sofa-back" />
              <span className="mini-journey-sofa-seat" />
              <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--left" />
              <span className="mini-journey-sofa-cushion mini-journey-sofa-cushion--right" />
            </div>
          )}
        </div>
        <div className="mini-journey-prep-focus-card">
          <p className="focus-progress-cue">{step.stepLabel}</p>
          <div className={`mini-journey-prep-focus mini-journey-prep-focus-current mini-journey-prep-focus--${step.variation}`} aria-label={`Vorbereitung ${step.anchorWord}`}>
            <MiniJourneyPrepVariationCue variation={step.variation} />
            <span className="mini-journey-prep-focus-text">{step.focus}</span>
          </div>
        </div>
      </div>
      <p className="section-kicker">{step.prepTitle}</p>
      <h2 id="mini-journey-prep-title">{step.childPrompt}</h2>
      <p>{step.teacherHint}</p>
      <p className="mama-family-success-text">{step.successText}</p>
      <p className="privacy-hint">Ein Schritt. Ohne Uhr. Es wird nichts gespeichert.</p>
      <div className="next-choice-grid pilot-next-grid" aria-label={`${step.prepTitle} fortsetzen`}>
        <button onClick={onAgain} type="button">Nochmal</button>
        <button onClick={onNext} type="button">{isLast ? 'Fertig' : 'Weiter'}</button>
        <button onClick={onTeacher} type="button">Zur Lehrkraft</button>
      </div>
    </article>
  );
}


function MiniJourneyPrepVariationCue({ variation }: { variation: ReturnType<typeof getMiniJourneyPrepSequence>[number]['variation'] }) {
  if (variation === 'listen-point') {
    return (
      <div className="mini-journey-prep-variation-cue mini-journey-prep-listen-point-cue" aria-hidden="true" data-variation="listen-point">
        <span className="mini-journey-prep-listen-ear" />
        <span className="mini-journey-prep-listen-wave mini-journey-prep-listen-wave--one" />
        <span className="mini-journey-prep-listen-wave mini-journey-prep-listen-wave--two" />
        <span className="mini-journey-prep-point-dot" />
        <span className="mini-journey-prep-point-finger" />
      </div>
    );
  }

  return (
    <div className="mini-journey-prep-variation-cue mini-journey-prep-eye-trace-cue" aria-hidden="true" data-variation="eye-trace">
      <span className="mini-journey-prep-eye-shape" />
      <span className="mini-journey-prep-eye-dot mini-journey-prep-eye-dot--one" />
      <span className="mini-journey-prep-eye-dot mini-journey-prep-eye-dot--two" />
      <span className="mini-journey-prep-eye-dot mini-journey-prep-eye-dot--three" />
      <span className="mini-journey-prep-eye-follow" />
    </div>
  );
}

function MamaFamilyJourneyStage({
  station,
  stationIndex,
  totalStations,
  onAgain,
  helpActive,
  onHelp,
  onNext,
  onTeacher,
}: {
  station: ReturnType<typeof getMamaFamilyMiniJourney>[number] | ReturnType<typeof getSofaFamilyMiniJourney>[number] | ReturnType<typeof getTasseFamilyMiniJourney>[number] | ReturnType<typeof getBallFamilyMiniJourney>[number] | ReturnType<typeof getBusFamilyMiniJourney>[number] | ReturnType<typeof getBuchFamilyMiniJourney>[number] | ReturnType<typeof getApfelFamilyMiniJourney>[number] | ReturnType<typeof getTischFamilyMiniJourney>[number] | ReturnType<typeof getHeftFamilyMiniJourney>[number];
  stationIndex: number;
  totalStations: number;
  onAgain: () => void;
  helpActive: boolean;
  onHelp: () => void;
  onNext: () => void;
  onTeacher: () => void;
}) {
  const isLast = stationIndex >= totalStations - 1;
  const syllables = station.anchorWord === 'Ball' ? ['Ball'] : station.anchorWord === 'Bus' ? ['Bus'] : station.anchorWord === 'Buch' ? ['Buch'] : station.anchorWord === 'Tisch' ? ['Tisch'] : station.anchorWord === 'Heft' ? ['Heft'] : station.anchorWord === 'Apfel' ? ['Ap', 'fel'] : station.anchorWord === 'Tasse' ? ['Tas', 'se'] : station.anchorWord === 'Sofa' ? ['So', 'fa'] : station.anchorWord === 'Lama' ? ['La', 'ma'] : ['Ma', 'ma'];
  const childPathSteps = ['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'];
  const layerLabel = station.label === 'Silbe' ? 'Silben' : station.label;
  const activePathIndex = Math.max(0, childPathSteps.indexOf(layerLabel));
  const nextAction = isLast ? 'Drück Fertig, wenn du bereit bist.' : 'Drück Weiter, wenn du bereit bist.';
  const layerCueByLabel: Record<string, string> = {
    Bild: 'Schau.',
    Silben: 'Lies langsam.',
    Wort: 'Lies ganz.',
    Satz: 'Lies den Satz.',
    'Mini-Geschichte': 'Zeig, was passt.',
  };
  const layerCue = layerCueByLabel[layerLabel] ?? 'Schau.';
  const isStoryLayer = station.label === 'Mini-Geschichte';
  const isSentenceLayer = station.label === 'Satz';
  const [selectedStoryChoice, setSelectedStoryChoice] = useState<'correct' | 'distractor' | null>(null);
  const [selectedSentenceWord, setSelectedSentenceWord] = useState<string | null>(null);
  const sentenceText = station.childPrompt.replace(/^Lies:\s*/i, '').trim();
  const storyMeaningText = sentenceText.replace(/\s*Was passt\?$/i, '').trim();
  const sentenceWords: string[] = sentenceText.split(/\s+/).filter(Boolean);
  const miniJourneyStoryChoices: Record<WordFamilyJourneyAnchor, { correct: MiniJourneyStoryChoice; distractor: MiniJourneyStoryChoice }> = {
    Mama: {
      correct: { text: 'Mama ist da.', symbol: 'Mama' },
      distractor: { text: 'Das Sofa ist da.', symbol: 'Sofa' },
    },
    Sofa: {
      correct: { text: 'Das Sofa ist da.', symbol: 'Sofa' },
      distractor: { text: 'Mama ist da.', symbol: 'Mama' },
    },
    Tasse: {
      correct: { text: 'Die Tasse ist da.', symbol: 'Tasse' },
      distractor: { text: 'Das Sofa ist da.', symbol: 'Sofa' },
    },
    Ball: {
      correct: { text: 'Der Ball rollt.', symbol: 'Ball' },
      distractor: { text: 'Die Tasse ist da.', symbol: 'Tasse' },
    },
    Bus: {
      correct: { text: 'Der Bus fährt.', symbol: 'Bus' },
      distractor: { text: 'Der Ball rollt.', symbol: 'Ball' },
    },
    Buch: {
      correct: { text: 'Das Buch ist da.', symbol: 'Buch' },
      distractor: { text: 'Der Bus fährt.', symbol: 'Bus' },
    },
    Lama: {
      correct: { text: 'Das Lama ist da.', symbol: 'Lama' },
      distractor: { text: 'Mama ist da.', symbol: 'Mama' },
    },
    Apfel: {
      correct: { text: 'Der Apfel ist da.', symbol: 'Apfel' },
      distractor: { text: 'Die Tasse ist da.', symbol: 'Tasse' },
    },
    Tisch: {
      correct: { text: 'Der Tisch ist da.', symbol: 'Tisch' },
      distractor: { text: 'Der Ball rollt.', symbol: 'Ball' },
    },
    Heft: {
      correct: { text: 'Das Heft ist da.', symbol: 'Heft' },
      distractor: { text: 'Das Buch ist da.', symbol: 'Buch' },
    },
  };
  const comprehensionChoices = miniJourneyStoryChoices[station.anchorWord as WordFamilyJourneyAnchor] ?? miniJourneyStoryChoices.Mama;

  useEffect(() => {
    setSelectedStoryChoice(null);
    setSelectedSentenceWord(null);
  }, [station.anchorWord, station.label]);

  return (
    <article className={`focus-stage-card mama-family-journey-stage mini-journey-play-scene mini-journey-premium-stage${helpActive ? ' mini-journey-help-active' : ''}`} aria-labelledby="word-family-journey-title">
      <p className="focus-progress-cue">Reise {stationIndex + 1} von {totalStations}</p>
      <div className="mini-journey-orientation-card" aria-label="Mini-Reise Orientierung">
        <div>
          <span>Aktuelles Wort</span>
          <strong>{station.anchorWord}</strong>
        </div>
        <div>
          <span>Jetzt: {station.label}</span>
          <strong>{stationIndex + 1} von {totalStations}</strong>
        </div>
        <p className="mini-journey-next-action">Dein nächster Schritt: {nextAction}</p>
      </div>
      <div className="mini-journey-scene-panel" aria-label={`${station.anchorWord} Spielraum`}>
        <div className="mini-journey-stage-sky" aria-hidden="true" />
        <div className="mini-journey-current-object">
          <p className="mini-journey-layer-cue">{layerCue}</p>
          {isStoryLayer ? (
            <div className="mini-journey-comprehension-scene" aria-label={`Mini-Geschichte verstehen: ${storyMeaningText}`}>
              <p className="mini-journey-comprehension-question">Was passt?</p>
              <strong className="mini-journey-comprehension-sentence">{storyMeaningText}</strong>
              <div className="mini-journey-comprehension-choices" aria-label="Zwei ruhige Auswahlkarten">
                <button
                  className={`mini-journey-comprehension-card mini-journey-comprehension-card--${comprehensionChoices.correct.symbol.toLowerCase()}${selectedStoryChoice === 'correct' ? ' selected' : ''}`}
                  onClick={() => setSelectedStoryChoice('correct')}
                  type="button"
                  aria-pressed={selectedStoryChoice === 'correct'}
                  aria-label={comprehensionChoices.correct.text}
                >
                  <MiniJourneySymbolScene anchorWord={comprehensionChoices.correct.symbol} className="mini-journey-comprehension-symbol" />
                  <strong>{comprehensionChoices.correct.text}</strong>
                </button>
                <button
                  className={`mini-journey-comprehension-card mini-journey-comprehension-card--${comprehensionChoices.distractor.symbol.toLowerCase()}${selectedStoryChoice === 'distractor' ? ' selected' : ''}`}
                  onClick={() => setSelectedStoryChoice('distractor')}
                  type="button"
                  aria-pressed={selectedStoryChoice === 'distractor'}
                  aria-label={comprehensionChoices.distractor.text}
                >
                  <MiniJourneySymbolScene anchorWord={comprehensionChoices.distractor.symbol} className="mini-journey-comprehension-symbol" />
                  <strong>{comprehensionChoices.distractor.text}</strong>
                </button>
              </div>
              {selectedStoryChoice ? (
                <p className="mini-journey-story-feedback" role="status">
                  {selectedStoryChoice === 'correct' ? 'Das passt.' : 'Schau langsam. Wähle in Ruhe.'}
                </p>
              ) : null}
            </div>
          ) : isSentenceLayer ? (
            <div className="mini-journey-sentence-scene" aria-label={`Satz ${sentenceText}`}>
              <p className="mini-journey-sentence-task">Finde {station.anchorWord}.</p>
              <div className="mini-journey-syllable-trace" aria-label={`Silben bleiben sichtbar: ${syllables.join(' und ')}`}>
                {syllables.map((syllable) => <span className="mini-journey-syllable-tile" key={syllable}>{syllable}</span>)}
              </div>
              <div className="mini-journey-sentence-line" aria-label="Wörter im Satz">
                {sentenceWords.map((word) => {
                  const cleanWord = word.replace(/[^\p{L}äöüÄÖÜß]/gu, '');
                  const isAnchorWord = cleanWord === station.anchorWord;
                  const isSelected = selectedSentenceWord === word;
                  return (
                    <button
                      className={`mini-journey-word-tile${isAnchorWord ? ' mini-journey-word-tile--anchor' : ''}${isSelected ? ' selected' : ''}`}
                      key={word}
                      onClick={() => setSelectedSentenceWord(word)}
                      type="button"
                      aria-pressed={isSelected}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
              {selectedSentenceWord ? (
                <p className="mini-journey-sentence-feedback" role="status">
                  {selectedSentenceWord.replace(/[^\p{L}äöüÄÖÜß]/gu, '') === station.anchorWord ? `${station.anchorWord} gefunden.` : `Schau nach ${station.anchorWord}.`}
                </p>
              ) : null}
            </div>
          ) : layerLabel === 'Bild' ? (
            <div className="mini-journey-primary-stage mini-journey-primary-stage--picture">
              <MiniJourneySymbolScene anchorWord={station.anchorWord as WordFamilyJourneyAnchor} className="mini-journey-stage-visual-symbol" />
              <strong className="mini-journey-word-display">{station.anchorWord}</strong>
            </div>
          ) : layerLabel === 'Wort' ? (
            <div className="mini-journey-primary-stage mini-journey-primary-stage--word">
              <strong className="mini-journey-word-display mini-journey-word-display--hero">{station.anchorWord}</strong>
            </div>
          ) : (
            <>
              <div className={`mini-journey-focus-symbol mini-journey-focus-symbol--${station.anchorWord.toLowerCase()}`} aria-label={`Silben ${syllables.join(' und ')}`}>
                {syllables.map((syllable) => <span className="mini-journey-syllable-tile" key={syllable}>{syllable}</span>)}
              </div>
              <strong className="mini-journey-word-display">{station.anchorWord}</strong>
            </>
          )}
        </div>
        <div className="mini-journey-spielraum-path" aria-label="Lernpfad: Bild, Silben, Wort, Satz, Mini-Geschichte">
          <div className="mini-journey-layer-badge" aria-live="polite">Jetzt: {layerLabel}</div>
          <ol className="mini-journey-stage-track" aria-label="Bild Silben Wort Satz Mini-Geschichte">
            {childPathSteps.map((label, index) => (
              <li
                aria-current={index === activePathIndex ? 'step' : undefined}
                className={index === activePathIndex ? 'mini-journey-stage-focus' : index < activePathIndex ? 'mini-journey-stage-done mini-journey-stage-quiet' : 'mini-journey-stage-quiet'}
                key={label}
              >
                <span>{label}</span>
                <small>{layerCueByLabel[label]}</small>
              </li>
            ))}
          </ol>
          <div className="mini-journey-path-stones" aria-hidden="true">
            {childPathSteps.map((label, index) => (
              <span className={`mini-journey-path-stone${index === activePathIndex ? ' mini-journey-path-stone-current' : ''}`} key={label} />
            ))}
          </div>
        </div>
      </div>
      <p className="section-kicker">{station.label}</p>
      <h2 id="word-family-journey-title">{station.childPrompt}</h2>
      {helpActive ? (
        <div className="mini-journey-help-box" role="status">
          <p>Wir schauen langsam. Erst die Silben, dann das Wort.</p>
          <ol aria-label="Hilfeschritte">
            <li>erst schauen</li>
            <li>dann lesen</li>
          </ol>
        </div>
      ) : null}
      <p className="mama-family-success-text">{station.successText}</p>
      <p className="privacy-hint">Bleibt nur hier im Browser.</p>
      <div className="next-choice-grid pilot-next-grid mini-journey-actions" aria-label={`${station.journeyTitle} fortsetzen`}>
        <button onClick={onAgain} type="button">Nochmal</button>
        <button aria-pressed={helpActive} onClick={onHelp} type="button">Hilfe</button>
        <button className="mini-journey-primary-action" onClick={onNext} type="button">{isLast ? 'Fertig' : 'Weiter'}</button>
        <button className="mini-journey-teacher-exit" onClick={onTeacher} type="button">Zur Lehrkraft</button>
      </div>
    </article>
  );
}

function FinishScreen({ pilotMode, sequenceMode, wortpostMode, objectFamilyMomentMode, mamaJourneyMode, journeyTitle = 'Mama-Mini-Reise', onAgain, onTeacher }: { pilotMode?: boolean; sequenceMode?: boolean; wortpostMode?: boolean; objectFamilyMomentMode?: boolean; mamaJourneyMode?: boolean; journeyTitle?: string; onAgain: () => void; onTeacher: () => void }) {
  return (
    <article className={wortpostMode ? 'finish-card wortpost-finish-card' : 'finish-card'}>
      <p className="section-kicker">Abschluss</p>
      <h2>{wortpostMode ? 'Die Wortpost ist im Lesegarten angekommen.' : objectFamilyMomentMode ? 'Der Teller-Moment ist fertig.' : mamaJourneyMode ? `Die ${journeyTitle} ist fertig.` : 'Danke fürs Lesen.'}</h2>
      {wortpostMode ? <WortpostJourney cardIndex={2} totalCards={3} completedAll /> : null}
      <p>{pilotMode ? 'Du hast zwei Karten in Ruhe gelesen. Jetzt ist Pause.' : sequenceMode ? 'Du hast deine Karten in Ruhe gelesen. Jetzt ist Pause.' : wortpostMode ? 'Drei Briefe sind ruhig angekommen. Jetzt ist Pause.' : objectFamilyMomentMode ? 'Der Teller lag auf dem Tisch. Jetzt ist Pause.' : mamaJourneyMode ? 'Fünf Schritte sind ruhig gelesen. Jetzt ist Pause.' : 'Du hast dir Zeit genommen. Jetzt ist Pause.'}</p>
      <div className="next-choice-grid">
        <button onClick={onAgain} type="button">{pilotMode ? 'Pilot noch einmal starten' : sequenceMode ? 'Auswahl nochmal starten' : wortpostMode ? 'Wortpost nochmal starten' : objectFamilyMomentMode ? 'Nochmal Teller' : mamaJourneyMode ? 'Mini-Reise nochmal starten' : 'Noch ein Wort'}</button>
        <button onClick={onTeacher} type="button">Zur Lehrkraft</button>
      </div>
    </article>
  );
}

function LeseMissionStage({
  items,
  itemIndex,
  started,
  step,
  onStart,
  onNext,
  onTeacher,
}: {
  items: any[];
  itemIndex: number;
  started: boolean;
  step: 'start' | 'word' | 'action' | 'finish';
  onStart: () => void;
  onNext: () => void;
  onTeacher: () => void;
}) {
  const currentItem = items[itemIndex] ?? items[0];
  const visibleItemNumber = Math.min(itemIndex + 1, Math.max(items.length, 1));
  const progressText = `Wort ${visibleItemNumber} von ${Math.max(items.length, 1)}`;
  const nextLabel = itemIndex >= items.length - 1 ? 'Fertig' : 'Nächstes Wort';
  const wordAction = currentItem?.complexUnits?.length > 0 ? 'Zeige auf das Wort.' : 'Sprich das Wort langsam.';
  const finalAction = currentItem?.pictureHint ? 'Lege es zum Bild.' : 'Zeige auf das Wort.';
  const missionActionCue = currentItem?.pictureHint ? 'Lege es zum Bild.' : wordAction;
  const stageLabel = step === 'word' ? 'Anschauen' : step === 'action' ? 'Handlung' : step === 'finish' ? 'Fertig' : 'Start';
  const syllableParts = String(currentItem?.syllablesText || currentItem?.word || '')
    .split(/\s+/)
    .filter(Boolean);
  const missionWords = items.map((item, index) => ({
    id: item.id ?? `${item.word}-${index}`,
    word: item.word,
    state: index < itemIndex ? 'done' : index === itemIndex && step !== 'finish' ? 'active' : step === 'finish' ? 'done' : 'waiting',
  }));

  return (
    <article className="lese-mission-shell" aria-labelledby="lese-mission-title">
      <div className="lese-mission-stage-bg" aria-hidden="true">
        <span className="lese-mission-blob lese-mission-blob-one" />
        <span className="lese-mission-blob lese-mission-blob-two" />
        <span className="lese-mission-floor" />
      </div>
      <div className="lese-mission-topline" aria-label="Lese-Mission Fortschritt">
        <div className="lese-mission-guide">
          <div className="lese-mission-neva" aria-hidden="true">
            <span className="lese-mission-neva-ear left" />
            <span className="lese-mission-neva-ear right" />
            <span className="lese-mission-neva-face">
              <span className="lese-mission-neva-eye left" />
              <span className="lese-mission-neva-eye right" />
              <span className="lese-mission-neva-nose" />
            </span>
          </div>
          <div>
            <p className="section-kicker">Neva hilft</p>
            <strong>{stageLabel}</strong>
          </div>
        </div>
        <div className="lese-mission-path" aria-label={progressText}>
          {missionWords.map((missionWord, index) => (
            <span className={`lese-mission-path-dot ${missionWord.state}`} key={missionWord.id}>
              <span>{index + 1}</span>
              <small>{missionWord.word}</small>
            </span>
          ))}
        </div>
      </div>
      {!started ? (
        <div className="lese-mission-start-screen">
          <p className="section-kicker">Lese-Mission</p>
          <h2 id="lese-mission-title">Bereit für deinen Leseraum?</h2>
          <p>Du siehst gleich {items.length === 1 ? 'ein Wort' : `${items.length} Wörter`}. Neva zeigt dir immer nur den nächsten kleinen Schritt.</p>
          <div className="lese-mission-actions">
            <button className="primary-action lese-mission-primary" onClick={onStart} type="button">Mission starten</button>
            <button className="secondary-action" onClick={onTeacher} type="button">Zur Lehrkraft</button>
          </div>
        </div>
      ) : step === 'finish' ? (
        <div className="lese-mission-finish-screen">
          <p className="section-kicker">Geschafft</p>
          <h2>Deine Lese-Mission ist geschafft.</h2>
          <p>Du hast jedes Wort in Ruhe angeschaut und eine kleine Handlung gemacht. Jetzt ist Pause.</p>
          <div className="lese-mission-celebration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="lese-mission-actions">
            <button className="primary-action lese-mission-primary" onClick={onTeacher} type="button">Zur Lehrkraft</button>
            <button className="secondary-action" onClick={onTeacher} type="button">Beenden</button>
          </div>
        </div>
      ) : step === 'word' ? (
        <div className="lese-mission-card lese-mission-card--play lese-mission-card--word">
          <p className="lese-mission-progress">{progressText} · Anschauen</p>
          <p className="section-kicker">Wort</p>
          <div className="lese-mission-primary-stage" aria-label={`Wortbühne zu ${currentItem?.word ?? 'Wort'}`}>
            <p className="lese-mission-stage-cue">Schau. Lies.</p>
            <div className="lese-mission-symbol-slot lese-mission-symbol-slot--hero" aria-label={`Bild oder Symbol zu ${currentItem?.word ?? 'Wort'}`}>
              <LeseMissionSymbolScene word={currentItem?.word} hint={currentItem?.pictureHint} />
            </div>
            <h2 className="lese-mission-word">{currentItem?.word}</h2>
          </div>
          <div className="lese-mission-syllable-row" aria-label="Silben">
            {syllableParts.length > 0 ? syllableParts.map((part, index) => (
              <span className={index % 2 === 0 ? 'syllable blue' : 'syllable red'} key={`${currentItem?.word}-${part}-${index}`}>
                {part}
              </span>
            )) : <span className="syllable plain">Silben noch nicht hinterlegt</span>}
          </div>
          <p className="lese-mission-helper">Schau erst auf das Bildfeld. Dann lies das Wort langsam.</p>
          <div className="lese-mission-actions">
            <button className="primary-action lese-mission-primary" onClick={onNext} type="button">Weiter</button>
            <button className="secondary-action" onClick={onTeacher} type="button">Zur Lehrkraft</button>
          </div>
        </div>
      ) : step === 'action' ? (
        <div className="lese-mission-card lese-mission-card--play lese-mission-card--action">
          <p className="lese-mission-progress">{progressText} · Handlung</p>
          <p className="section-kicker">Aktion</p>
          <div className="lese-mission-primary-stage" aria-label={`Handlungsbühne zu ${currentItem?.word ?? 'Wort'}`}>
            <p className="lese-mission-stage-cue">Zeig. Sprich.</p>
            <h2 className="lese-mission-word">{currentItem?.word}</h2>
            <div className="lese-mission-action-symbol" aria-label={`Bild oder Symbol zu ${currentItem?.word ?? 'Wort'}`}>
              <LeseMissionSymbolScene word={currentItem?.word} hint={currentItem?.pictureHint} />
            </div>
            <div className="lese-mission-action-panel" aria-label="Lesehandlung">
              <p className="lese-mission-action-text">{missionActionCue}</p>
            </div>
          </div>
          <div className="lese-mission-actions">
            <button className="primary-action lese-mission-primary" onClick={onNext} type="button">{nextLabel}</button>
            <button className="secondary-action" onClick={onTeacher} type="button">Zur Lehrkraft</button>
          </div>
        </div>
      ) : (
        <div className="lese-mission-card">
          <p className="lese-mission-progress">{progressText}</p>
          <p className="section-kicker">Wort</p>
          <h2 className="lese-mission-word">{currentItem?.word}</h2>
          <p className="lese-mission-action-text">Sprich das Wort langsam.</p>
          <div className="lese-mission-actions">
            <button className="primary-action lese-mission-primary" onClick={onNext} type="button">Fertig</button>
            <button className="secondary-action" onClick={onTeacher} type="button">Zur Lehrkraft</button>
          </div>
        </div>
      )}
    </article>
  );
}

function Alpha73MaterialkorbView({
  items,
  onRemove,
  onStartLeseMission,
}: {
  items: any[];
  onRemove: (id: string) => void;
  onStartLeseMission: () => void;
}) {
  const [cardMode, setCardMode] = useState<'wort' | 'silben' | 'satz' | 'reihe'>('wort');
  const [showSymbolField, setShowSymbolField] = useState(true);
  const recommendation = useMemo(() => getMaterialkorbRecommendation(items), [items]);

  const isPresetActive = (preset: 'einfach' | 'silbenfokus' | 'satzaufbau' | 'ge-sehr-leicht') => {
    if (preset === 'einfach') return cardMode === 'wort' && showSymbolField;
    if (preset === 'silbenfokus') return cardMode === 'silben' && showSymbolField;
    if (preset === 'satzaufbau') return cardMode === 'satz' && showSymbolField;
    return cardMode === 'reihe' && showSymbolField;
  };

  const applyPreset = (preset: 'einfach' | 'silbenfokus' | 'satzaufbau' | 'ge-sehr-leicht') => {
    if (preset === 'einfach') {
      setCardMode('wort');
      setShowSymbolField(true);
      return;
    }

    if (preset === 'silbenfokus') {
      setCardMode('silben');
      setShowSymbolField(true);
      return;
    }

    if (preset === 'satzaufbau') {
      setCardMode('satz');
      setShowSymbolField(true);
      return;
    }

    setCardMode('reihe');
    setShowSymbolField(true);
  };

  const applyRecommendation = () => {
    applyPreset(recommendation.preset);
  };

  if (items.length === 0) return null;

  const modeLabel = cardMode === 'wort'
    ? 'Wortkarte'
    : cardMode === 'silben'
      ? 'Silbenkarte'
      : cardMode === 'satz'
        ? 'Satzstarterkarte'
        : 'Mini-Förderreihe';
  const modeDescription = cardMode === 'wort'
    ? 'Großes Wort mit ruhigem Hinweis zur Einordnung.'
    : cardMode === 'silben'
      ? 'Wort mit deutlich sichtbarer Silbenzeile.'
      : cardMode === 'satz'
        ? 'Wort mit einfachem Satzstarter für den nächsten Sprachschritt.'
        : 'Vier ruhige Schritte: Wort sehen, Silben hören, Satz anfangen, langsam lesen.';
  const presetHelp = isPresetActive('einfach')
    ? 'Preset Einfach: Wortkarte mit Bildfeld für einen klaren, niedrigen Einstieg.'
    : isPresetActive('silbenfokus')
      ? 'Preset Silbenfokus: Silbenkarte mit Bildfeld zum gemeinsamen Silbenlesen.'
      : isPresetActive('satzaufbau')
        ? 'Preset Satzaufbau: Satzstarterkarte mit Bildfeld für den nächsten Sprachschritt.'
        : isPresetActive('ge-sehr-leicht')
          ? 'Preset GE sehr leicht: Mini-Förderreihe mit Bildfeld für einen sehr ruhigen Einstieg.'
          : 'Eigene Einstellung: Kartentyp und Bildfeld frei anpassen.';

  return (
    <section id="alpha73-materialkorb" className="alpha73-materialkorb teacher-primary-card" aria-labelledby="materialkorb-title">
      <div className="materialkorb-header no-print">
        <div>
          <p className="section-kicker">Materialkorb v2</p>
          <h3 id="materialkorb-title">Für Material vorbereiten</h3>
          <p>Kompakte Liste ausgewählter Alltagswörter für die Druckvorbereitung. <small style={{ color: 'var(--text-muted)' }}>(Druckansicht nutzt den gewählten Kartentyp)</small></p>
        </div>
        <button className="secondary-action" onClick={() => window.print()} type="button">Druckansicht</button>
      </div>

      <div className="materialkorb-controls no-print" role="group" aria-label="Kartentyp wählen">
        <span className="materialkorb-controls-label">Presets</span>
        <div className="materialkorb-preset-control" role="group" aria-label="Materialkorb-Presets wählen">
          {([
            ['einfach', 'Einfach'],
            ['silbenfokus', 'Silbenfokus'],
            ['satzaufbau', 'Satzaufbau'],
            ['ge-sehr-leicht', 'GE sehr leicht'],
          ] as const).map(([preset, label]) => (
            <button
              key={preset}
              type="button"
              className={isPresetActive(preset) ? 'selected' : ''}
              aria-pressed={isPresetActive(preset)}
              onClick={() => applyPreset(preset)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="materialkorb-mode-help">{presetHelp}</p>

        <span className="materialkorb-controls-label">Kartentyp</span>
        <div className="materialkorb-segmented-control">
          {([
            ['wort', 'Wortkarte'],
            ['silben', 'Silbenkarte'],
            ['satz', 'Satzstarterkarte'],
            ['reihe', 'Mini-Förderreihe'],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cardMode === value ? 'selected' : ''}
              aria-pressed={cardMode === value}
              onClick={() => setCardMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="materialkorb-mode-help">{modeDescription}</p>
      </div>

      {items.length > 0 ? (
        <div className="materialkorb-launch-row no-print" aria-label="Lese-Mission starten">
          <div>
            <p className="materialkorb-controls-label">Lese-Mission v1</p>
            <p className="materialkorb-mode-help">Nimmt die ersten {Math.min(3, items.length)} ausgewählten Wörter in eine ruhige Vollbild-Mission.</p>
          </div>
          <button className="primary-action materialkorb-launch-button" onClick={onStartLeseMission} type="button">
            Als Lese-Mission starten
          </button>
        </div>
      ) : null}

      <div className="materialkorb-mini-assistant no-print" aria-label="Materialkorb Empfehlung">
        <div>
          <p className="materialkorb-mini-assistant-kicker">Mini-Assistent</p>
          <p className="materialkorb-mini-assistant-title">{recommendation.headline}</p>
          <p className="materialkorb-mini-assistant-text">{recommendation.reason}</p>
          <p className="materialkorb-mini-assistant-next">Nächster Schritt: {recommendation.nextStep}</p>
        </div>
        <button type="button" className="secondary-action materialkorb-mini-assistant-button" onClick={applyRecommendation}>
          Empfehlung anwenden
        </button>
      </div>

      <div className="materialkorb-controls materialkorb-controls--compact no-print" role="group" aria-label="Bildfeld steuern">
        <span className="materialkorb-controls-label">Bildfeld</span>
        <label className="materialkorb-toggle-pill">
          <input
            checked={showSymbolField}
            onChange={(event) => setShowSymbolField(event.target.checked)}
            type="checkbox"
          />
          <span>{showSymbolField ? 'Bildfeld drucken' : 'Bildfeld ausblenden'}</span>
        </label>
        <p className="materialkorb-mode-help">Ein ruhiger Platzhalter für späteres Bild oder Symbol.</p>
      </div>

      <div className="materialkorb-print-panel" data-card-mode={cardMode} aria-label="Druckkarten für ausgewählte Wörter">
        <div className="materialkorb-print-intro print-only">
          <p className="section-kicker">Alpha-73A · {modeLabel}</p>
          <h4>Bereit für A4-Druck</h4>
          <p>{modeDescription}</p>
        </div>
        <div className="materialkorb-print-grid">
          {items.map(item => {
            const domainLabel = item.domain.replace('-', ' ');
            const supportLabel = item.isAdvanced ? 'Lehrkraft begleitet' : 'Kind kann direkt lesen';
            const hintLabel = item.complexUnits.length > 0 ? `Achtung: ${item.complexUnits.join(', ')}` : 'Leichte Einheit';
            const syllablesLabel = item.syllablesText || 'Silben nicht hinterlegt';
            const sentenceStarter = makeSentenceStarter(item.word, domainLabel, item.isAdvanced);
            const teacherNote = makeMaterialkorbTeacherNote(cardMode, item);
            const miniSeriesSteps = createMiniFoerderreiheSteps(item, domainLabel);

            return (
              <article key={item.id} className="materialkorb-print-card">
                <div className="materialkorb-print-card-head">
                  <span className="materialkorb-print-domain">{domainLabel}</span>
                  <span className={item.isAdvanced ? 'tag-advanced materialkorb-print-tag' : 'tag-child materialkorb-print-tag'}>
                    {item.isAdvanced ? 'Lehrkraft' : 'Kind'}
                  </span>
                </div>
                {showSymbolField && (
                  <div className="materialkorb-symbol-slot" aria-label="Bild oder Symbol Platzhalter">
                    <span className="materialkorb-symbol-slot-label">Bild / Symbol</span>
                  </div>
                )}
                <strong className="materialkorb-print-word">{item.word}</strong>
                {cardMode === 'wort' && (
                  <>
                    <p className="materialkorb-print-support">{supportLabel}</p>
                    <p className="materialkorb-print-hint">{hintLabel}</p>
                  </>
                )}
                {cardMode === 'silben' && (
                  <>
                    <p className="materialkorb-print-syllables materialkorb-print-syllables-strong">{syllablesLabel}</p>
                    <p className="materialkorb-print-support">{supportLabel}</p>
                  </>
                )}
                {cardMode === 'satz' && (
                  <>
                    <p className="materialkorb-print-sentence">{sentenceStarter}</p>
                    <p className="materialkorb-print-support">{supportLabel}</p>
                  </>
                )}
                {cardMode === 'reihe' && (
                  <div className="materialkorb-mini-foerderreihe" aria-label="Mini-Förderreihe">
                    {miniSeriesSteps.map((step) => (
                      <div key={step.label} className="materialkorb-mini-foerderreihe-step">
                        <span className="materialkorb-mini-foerderreihe-step-label">{step.label}</span>
                        <span className="materialkorb-mini-foerderreihe-step-text">{step.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="materialkorb-print-graphemes">Grapheme: {item.requiredGraphemes.join(', ')}</p>
                <p className="materialkorb-print-teacher-note">Lehrerhinweis: {teacherNote}</p>
                <div className="materialkorb-print-meta no-print">
                  <span>{domainLabel}</span>
                  <span>{item.requiredGraphemes.join(', ')}</span>
                  <span className={item.isAdvanced ? 'tag-advanced' : 'tag-child'}>
                    {item.isAdvanced ? 'Lehrkraft' : 'Kind'}
                  </span>
                </div>
                <button
                  className="remove-button no-print"
                  onClick={() => onRemove(item.id)}
                  aria-label={`${item.word} entfernen`}
                  type="button"
                >×</button>
              </article>
            );
          })}
        </div>
      </div>
      <p className="privacy-hint no-print">Wörter auswählen: Diese Liste hilft bei der Vorbereitung von haptischem Material.</p>
    </section>
  );
}

function createMiniFoerderreiheSteps(item: any, domainLabel: string) {
  const sentenceAction = item.isAdvanced
    ? 'Sprich den Satz langsam.'
    : 'Sprich den Satz ruhig.';
  const actionPrompt = item.complexUnits.length > 0
    ? `Besondere Stellen beachten: ${item.complexUnits.join(', ')}.`
    : item.isAdvanced
      ? 'Zeige auf das Wort.'
      : 'Lege die Karte zum Bild.';

  return [
    { label: '1. Wort sehen', text: item.word },
    { label: '2. Silben hören / klatschen', text: item.syllablesText || 'Silben noch nicht hinterlegt' },
    { label: '3. Satz anfangen', text: makeSentenceStarter(item.word, domainLabel, item.isAdvanced) },
    { label: '4. Lesehandlung', text: `${actionPrompt} ${sentenceAction}`.trim() },
  ];
}

function makeSentenceStarter(word: string, domainLabel: string, isAdvanced: boolean) {
  const safeWord = word.trim();
  const templates: Record<string, string> = {
    Schule: `Ich brauche das ${safeWord} in der Schule.`,
    Essen: `Ich nehme das ${safeWord} zum Essen.`,
    Körper: `Ich brauche das ${safeWord} für meinen Körper.`,
    Alltag: `Ich nutze das ${safeWord} im Alltag.`,
  };

  if (templates[domainLabel]) return templates[domainLabel];
  return isAdvanced
    ? `Ich kann das ${safeWord} mit Unterstützung nutzen.`
    : `Ich sehe das ${safeWord}.`;
}

function makeMaterialkorbTeacherNote(cardMode: 'wort' | 'silben' | 'satz' | 'reihe', item: any) {
  const baseNote = cardMode === 'wort'
    ? 'Wort ruhig lesen und in Bedeutung einordnen.'
    : cardMode === 'silben'
      ? 'Silben gemeinsam klatschen und danach lesen.'
      : cardMode === 'satz'
        ? 'Satz langsam sprechen und gemeinsam ergänzen.'
        : 'Vier ruhige Schritte nacheinander gehen.';

  if (item.isAdvanced) {
    return `${baseNote} Lehrkraft gibt bei ${item.word} etwas mehr Unterstützung.`;
  }

  if ((item.complexUnits || []).length > 0) {
    return `${baseNote} Besondere Stellen beachten: ${item.complexUnits.join(', ')}.`;
  }

  return baseNote;
}

function Alpha73InventoryView({
  items,
  domains,
  gates,
  activeDomain,
  activeGate,
  selectedIds,
  onToggleMaterialkorb,
  onDomainChange,
  onGateChange,
  onChooseTask,
}: {
  items: any[];
  domains: string[];
  gates: string[];
  activeDomain: string | null;
  activeGate: string | null;
  selectedIds: string[];
  onToggleMaterialkorb: (id: string) => void;
  onDomainChange: (domain: string | null) => void;
  onGateChange: (gate: string | null) => void;
  onChooseTask: (id: string) => void;
}) {
  return (
    <section id="alpha73-inventory" className="alpha73-inventory teacher-secondary-card" aria-labelledby="alpha73-title">
      <div>
        <p className="section-kicker">Alpha-73A Erweiterung</p>
        <h3 id="alpha73-title">Alltagswortschatz sichten</h3>
        <p>16 Wörter aus Schule, Essen, Körper und Alltag. Gezielt als Ergänzung einsetzbar.</p>
      </div>
      
      <div className="inventory-filters">
        <div className="filter-group">
          <strong>Bereich</strong>
          <div className="filter-chips">
            <button className={activeDomain === null ? 'selected' : ''} onClick={() => onDomainChange(null)} type="button">Alle</button>
            {domains.map(d => (
              <button key={d} className={activeDomain === d ? 'selected' : ''} onClick={() => onDomainChange(d)} type="button">{d.replace('-', ' ')}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <strong>Sichtbarkeit</strong>
          <div className="filter-chips">
            <button className={activeGate === null ? 'selected' : ''} onClick={() => onGateChange(null)} type="button">Alle</button>
            {gates.map(g => (
              <button key={g} className={activeGate === g ? 'selected' : ''} onClick={() => onGateChange(g)} type="button">
                {g === 'teacher-led-advanced' ? 'gemeinsam / advanced' : g === 'teacher-selectable' ? 'Lehrkraft-Wahl' : 'sofort im Kinderpfad'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="inventory-grid" aria-label="Alpha-73A Wortliste">
        {items.map(item => (
          <article key={item.id} className={item.isAdvanced ? 'inventory-card advanced' : 'inventory-card'}>
            <div className="inventory-card-head">
              <strong>{item.word}</strong>
              <span className="complexity-badge">{item.complexity}</span>
            </div>
            <p className="inventory-syllables">{item.syllablesText}</p>
            <div className="inventory-details">
              <small>Grapheme: {item.requiredGraphemes.join(', ')}</small>
              {item.complexUnits.length > 0 && <small className="unit-risk">Einheit: {item.complexUnits.join(', ')}</small>}
            </div>
            <div className="inventory-card-footer">
              <span>{item.domain}</span>
              <button 
                className={selectedIds.includes(item.id) ? 'secondary-action slim selected' : 'secondary-action slim'}
                onClick={() => onToggleMaterialkorb(item.id)} 
                type="button"
              >
                {selectedIds.includes(item.id) ? 'Gewaehlt' : 'Vorbereiten'}
              </button>
              <button className="secondary-action slim" onClick={() => onChooseTask(item.id)} type="button">Wort sichten</button>
            </div>
          </article>
        ))}
      </div>
      <p className="privacy-hint">Gezielte Auswahl für den Tagesweg: Wörter mit komplexen Einheiten (ch, sch, st, pf, ß, ck) lehrkraftgeführt anbieten.</p>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
