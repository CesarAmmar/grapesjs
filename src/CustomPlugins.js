import { addHardwareDiscovery } from "./plugins/HardwareDiscovery";
import { addHardDriveWiping } from "./plugins/HardDriveWiping";

export default function customPlugins(editor) {
  addHardwareDiscovery(editor);

  addHardDriveWiping(editor);
}
