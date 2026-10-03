export default function FileUploadPage({
    archetype,
  setArchetype,
  archetypeLoaded,
  setArchetypeLoaded,
}) {
    const data = archetypeLoaded ? JSON.stringify(archetype, null, 2) : "Nothing submitted yet.";
    return <pre>{data}</pre>;
}