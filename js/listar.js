$( document ).ready(
    function(){
        var props = [];
        props.push(new Propietario("Kevin", "Urieles", "Cra 7", "133246"));
        props.push(new Propietario("Carlos", "Campo", "Calle 10", "466563"));
        props[0].mascotas.push(new Mascota('Nasus', 'Perro', 'dic 6'));
        props[1].mascotas.push(new Mascota('Rengar', 'Gato', 'oct 6'));
        props[1].mascotas.push(new Mascota('Rengar', 'Gato', 'oct 6'));

        var propsSelect;

        function agregarPropietario(prop){
            let tr = document.createElement("tr");
            tr.setAttribute("name", props.indexOf(prop));
            let propie = "<td>"+prop.nombres+"</td>";
            propie += "<td>"+prop.apellidos+"</td>";
            propie += "<td>"+prop.direccion+"</td>";
            propie += "<td>"+prop.telefono+"</td>";
            propie += "<td>"+'<a class="det" name="'+props.indexOf(prop)+'">Ver detalles</a>'+"</td>";
            tr.innerHTML = propie;
            $("#listaprop").append(tr);
            let index = props.indexOf(prop);
            $('a[name='+index+']').click(function(){
                $("#nombres").val(props[index].nombres);
                $("#apellidos").val(props[index].apellidos);
                $('#direccion').val(props[index].direccion);
                $('#telefono').val(props[index].telefono);
                $('#listaMasc').html('');
                propsSelect = index;
                props[index].mascotas.forEach(masc => {
                    agregarMasc(masc, props[index].mascotas.indexOf(masc));
                });
            });
        }

        $('#editar').click(function(){
            var nom  = $("#nombres").val();
            var ape  = $("#apellidos").val();
            var dir  = $('#direccion').val();
            var tel  = $('#telefono').val();
            if(nom != '' && ape != '' && dir != '' && tel != ''){
                props[propsSelect].nombres = nom;
                props[propsSelect].apellidos = ape;
                props[propsSelect].direccion = dir;
                props[propsSelect].telefono = tel;
                $('tr[name='+propsSelect+']').html('');
                let propie = "<td>"+props[propsSelect].nombres+"</td>";
                propie += "<td>"+props[propsSelect].apellidos+"</td>";
                propie += "<td>"+props[propsSelect].direccion+"</td>";
                propie += "<td>"+props[propsSelect].telefono+"</td>";
                propie += "<td>"+'<a class="det" name="'+propsSelect+'">Ver detalles</a>'+"</td>";
                $('tr[name='+propsSelect+']').html(propie);
                $('a[name='+propsSelect+']').click(function(){
                    propsSelect = $(this).attr("name");
                    $("#nombres").val(props[propsSelect].nombres);
                    $("#apellidos").val(props[propsSelect].apellidos);
                    $('#direccion').val(props[propsSelect].direccion);
                    $('#telefono').val(props[propsSelect].telefono);
                    $('#listaMasc').html('');
                    props[propsSelect].mascotas.forEach(masc => {
                        agregarMasc(masc, props[propsSelect].mascotas.indexOf(masc));
                    });
                });
            }
        });

        function agregarMasc(masc, index, crear = true, nam = null){
            if(crear){
                var tr = document.createElement("tr");
                tr.setAttribute("name", masc.nombre+index);
            }else{
                $('tr[name='+(nam+index)+']').attr('name', masc.nombre+index);
            }
            let text = "<td>"+masc.nombre+"</td>";
            text += "<td>"+masc.tipo+"</td>";
            text += "<td>"+masc.fecha+"</td>";
            text += `<td><a class="det" id="${masc.nombre+index}">Editar</a></td>`;
            if(crear){
                $("#listaMasc").append(tr);
            }
            $('tr[name='+(masc.nombre+index)+']').html(text);


            $('#'+masc.nombre+index).click(function(){
                $('tr[name='+(masc.nombre+index)+']').html('');
                let text = `<td><input id="nombre${index}" value="${masc.nombre}"> </input> </td>`;
                text += `
                <td>
                    <select id="tipo${index}" >
                        <option value="" disabled>Tipo de mascota</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Leon">Leon</option>
                        <option value="Ave">Ave</option>
                    </select>
                </td>
                `;
                text += `<td><input id="fecha${index}" value="${masc.fecha}"> </input> </td>`;
                text += `<td><a class="datepicker det" id="${masc.nombre+index}">Guardar</a></td>`;
                $('tr[name='+(masc.nombre+index)+']').html(text);

                $('#tipo'+index).formSelect();
                $('#tipo'+index).val(masc.tipo);
                $('#tipo'+index).formSelect();

                $('#fecha'+index).datepicker();
                $('#'+masc.nombre+index).click(function(){
                    let nombreAnterior = masc.nombre;
                    let nom = $('#nombre'+index).val();
                    let tip = $('#tipo'+index).val();
                    let fec = $('#fecha'+index).val();
                    if(nom !='' && tip != '' && fec != ''){
                        props[propsSelect].mascotas[index].nombre = nom;
                        props[propsSelect].mascotas[index].tipo = tip;
                        props[propsSelect].mascotas[index].fecha = fec;
                        $('tr[name='+(masc.nombre+index)+']').html('');
                        agregarMasc(props[propsSelect].mascotas[index], index, false, nombreAnterior);
                    }
                });
            });
        }

        props.forEach(function(prop){
            agregarPropietario(prop);
        });
    }
);