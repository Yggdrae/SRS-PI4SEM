export default function formatarData(data: string, hora: string) {
    const ano = data.slice(0, 4);
    const mes = data.slice(4, 6);
    const dia = data.slice(6);
    const horas = hora.slice(0, 2);
    const minutos = hora.slice(2, 4);
    const dataFormatada = new Date(`${ano}-${mes}-${dia}T${horas}:${minutos}:00Z`);
    
    return dataFormatada;
}
