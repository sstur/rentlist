let controlSequence = /(\x1b\[[\x30-\x3F]*[\x20-\x2F]*[\x40-\x7E])+/g;

export default function formatPhotonError(error: Error) {
  let message = typeof error.message === 'string' ? error.message : '';
  // Replace control sequences.
  message = message.replace(controlSequence, '');
  message =
    message
      .trim()
      .split('\n')
      .pop() || '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let code: unknown = (error as any).code;
  if (typeof code === 'string') {
    let prefix = code + ':';
    if (message.startsWith(prefix)) {
      return message.slice(prefix.length).trim();
    }
  }
  return message;
}
