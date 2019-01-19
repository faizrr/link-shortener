import nanoid from 'nanoid';

export default function generate() {
  const id = nanoid(10);

  // doesn't start or end with special character
  if (id.match(/^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/i)) {
    return id;
  } else {
    return generate();
  }
}
