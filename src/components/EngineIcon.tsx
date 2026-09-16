import { SiGodotengine, SiUnity, SiUnrealengine } from "react-icons/si";

const icons = { Unity: SiUnity, "Unreal Engine": SiUnrealengine, Godot: SiGodotengine };

export function EngineIcon({ engine }: { engine: string }) {
  const Icon = icons[engine as keyof typeof icons];
  if (!Icon) return null;
  return <span className="engine-icon" role="img" aria-label={engine} title={engine}>
    <Icon size={24} aria-hidden="true" />
  </span>;
}
