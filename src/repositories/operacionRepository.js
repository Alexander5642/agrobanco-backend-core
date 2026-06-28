// CAPA 1 — REPOSITORY (Operaciones)
const { supabase } = require('../config/supabase');

exports.getCuentaByNumero = async (numeroCuenta) => {
  const { data, error } = await supabase
    .from('cuentas')
    .select('*')
    .eq('numero_cuenta', numeroCuenta)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
};

exports.actualizarSaldo = async (cuentaId, nuevoSaldo) => {
  const { data, error } = await supabase
    .from('cuentas')
    .update({ saldo: nuevoSaldo })
    .eq('id', cuentaId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

exports.registrarTransaccion = async (cuentaId, userId, tipoTransaccion, monto, descripcion) => {
  const { data, error } = await supabase
    .from('transacciones')
    .insert([{
      cuenta_id: cuentaId,
      user_id: userId,
      tipo_transaccion: tipoTransaccion,
      monto: monto,
      descripcion: descripcion
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

exports.registrarPago = async (userId, monto) => {
  const { data, error } = await supabase
    .from('pagos')
    .insert([{
      user_id: userId,
      monto: monto,
      estado: 'Completado'
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
