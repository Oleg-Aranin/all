const add = (a, b) => a + b
const generateGreeting = name => `Hi ${name}`

test('should add two numbers', () => {
    const result = add(3, 4)

    expect(result).toEqual(7)

    expect(generateGreeting('oleg')).toBe('Hi oleg')
})
