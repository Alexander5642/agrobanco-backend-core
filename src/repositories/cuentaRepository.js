// CAPA 1 — REPOSITORY (Cuentas)
const { supabase } = require('../config/supabase');

exports.getCuentasByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('cuentas')
    .select('*')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

exports.getTarjetasByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('tarjetas')
    .select('*')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

exports.getMovimientosByCuentaId = async (cuentaId) => {
  const { data, error } = await supabase
    .from('transacciones')
    .select('*')
    .eq('cuenta_id', cuentaId)
    .order('fecha', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};
