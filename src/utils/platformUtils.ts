export const getCtrlKey = () => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const platform = navigator.platform ?? navigator.userAgentData.platform;

  if (/IPHONE|IPAD|IPOD|MAC/.test(platform.toUpperCase())) {
    return "⌘";
  }
  return "Ctrl";
};
