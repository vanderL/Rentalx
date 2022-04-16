describe('Create Category', () => {
  it('Should be able 9 - 5 equal 4', () => {
    const soma = 9 - 5;
    const resultado = 4;

    expect(soma).toBe(resultado);
  });

  it('Should not be able 9 - 5 not equal 45', () => {
    const soma = 9 - 5;
    const resultado = 45;

    expect(soma).not.toBe(resultado);
  });
});
