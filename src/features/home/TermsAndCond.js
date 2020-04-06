import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TermsAndCond extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-terms-and-cond">
        <div className="text-div-content-inner">
          <img
            style={{ marginBottom: '5px' }}
            alt="edit"
            width="40"
            src={require('../../images/logo.png')}
          />
          <h5>Woordi</h5>
          <br />
          <br />
          <h4>Terminos y Condiciones</h4>
          <br />
          <p>
            ¡Te damos la bienvenida a Woordi! Woordi desarrolla tecnologías y servicios que permiten
            a las personas conectarse entre sí, establecer comunidades y hacer conocer sus ideales.
            Estas Condiciones rigen el uso de Woordi y los productos, las funcionalidades, las
            aplicaciones, los servicios, las tecnologías y el software que ofrecemos (los Productos
            de Woordi o Productos), excepto cuando indiquemos expresamente que se aplican otras
            condiciones distintas de estas. Nuestro objetivo es dar a las personas la
            posibilidad de crear comunidades y hacer del mundo un lugar más conectado y, para ello,
            ponemos a tu disposición los Productos y servicios que se describen a continuación: Te
            proporcionamos una experiencia personalizada: tus experiencias en Woordi son distintas
            de las del resto de personas que usan la plataforma. Todos los aspectos están
            personalizados: desde las publicaciones, las historias, los anuncios y otros contenidos
            que ves en la sección de noticias o en nuestra plataforma de vídeo, hasta las páginas
            que sigues y otras funciones que quizás usas. Usamos los datos que tenemos, por ejemplo, los relativos a las conexiones que
            entablas, las opciones y los ajustes de configuración que seleccionas, el tipo de
            contenido que compartes y las acciones que llevas a cabo en nuestros Productos o fuera
            de ellos para personalizar tu experiencia. Te conectamos con las personas y las
            organizaciones que te interesan: te ayudamos a encontrar personas, grupos, empresas,
            organizaciones y otras entidades que te interesan, así como a conectarte con ellos por
            medio de los Productos de Woordi que usas. En función de los datos que tenemos, te
            ofrecemos sugerencias a ti y a otras personas. Artículo 55: Los usuarios de Woordi se registran y utilizan la plataforma porque así ellos los desean. No existe convenio, ni compromiso, ni vínculo alguno entre usuarios (redactores/lectores) de la plataforma y Woordi. Cualquier usuario que publique contenido en Woordi puede dejar de hacerlo cuando lo desee. También puede eliminar sin ningún tipo de ataduras contenido publicado en su perfil cuando lo crea oportuno. Nuevamente, Woordi sólo ofrece la estructura digital tecnológica para que los usuarios la utilicen o dejen de utilizar cuando lo crean necesario. El usuario acepta y reconoce no tener vínculo, relación o compromiso de absolutamente ningún tipo con Woordi. El usuario usa la plataforma por asi lo quiere, por interes personal, para crecer intelectualmente, para que otros lean sus artículos o desarrollos literarios. Las comunidades
            funcionan mejor cuanto más estrechos son los lazos que unen a sus miembros, por eso
            creemos que nuestros servicios son más útiles si las personas se conectan con gente,
            grupos y organizaciones que les interesan. Te proporcionamos las herramientas que
            necesitas para expresar tu opinión y hablar sobre temas que te importan: En Woordi
            puedes expresarte y comunicarte con amigos, familiares y otras personas que te importan
            de distintas maneras. Por ejemplo, puedes compartir actualizaciones de estado, fotos,
            vídeos e historias en los diversos Productos de Woordi que usas, enviar mensajes a un
            amigo o a varias personas o añadir contenido a tu perfil.
            Combatimos las conductas perjudiciales, y protegemos y apoyamos a nuestra comunidad: Las personas solo crearán
            comunidades en Woordi si se sienten seguras. Contamos con equipos especializados y desarrollamos sistemas técnicos avanzados para detectar si nuestros Productos
            se usan de forma inapropiada, si alguien muestra una conducta perjudicial para los demás
            y si surgen situaciones en las que podamos contribuir para ayudar o proteger a nuestra
            comunidad. Si tenemos constancia de contenido o conductas de este tipo, aplicaremos las
            medidas correspondientes, tales como ofrecer ayuda, eliminar el contenido, bloquear el
            acceso a ciertas funcionalidades, inhabilitar una cuenta o ponernos en contacto con los
            órganos encargados de hacer cumplir la ley. Usamos y desarrollamos tecnologías
            avanzadas para ofrecer servicios seguros y funcionales a todo el mundo: usamos y
            desarrollamos tecnologías avanzadas, tales como inteligencia artificial, sistemas de
            aprendizaje automático y realidad aumentada, para que la gente pueda usar nuestros
            Productos de manera segura, independientemente de su capacidad física o la región
            geográfica donde se encuentre. También creamos una red sofisticada y
            desarrollamos tecnología de comunicación para que las personas en áreas con acceso
            limitado a internet puedan conectarse. Asimismo, desarrollamos sistemas automatizados
            destinados a mejorar nuestra capacidad de detectar y eliminar actividades abusivas o
            peligrosas que puedan perjudicar a nuestra comunidad y dañar la integridad de nuestros
            Productos. Realizamos estudios para detectar formas de mejorar nuestros servicios:
            Llevamos a cabo tareas de investigación con el propósito de desarrollar, probar y
            mejorar nuestros Productos. Fecha de la última revisión: 30 de Diciembre de 2019
          </p>
          <p>
            <b>Normas comunitarias</b> <br />
            Queremos que Woordi siga siendo un lugar auténtico y seguro en el que los usuarios
            puedan encontrar la inspiración y expresarse. Ayúdanos a fomentar esta comunidad.
            Publica solamente tus propias fotos y vídeos, y cumple en todo momento la Ley. Respeta a
            todos los usuarios de Woordi; no les envíes spam ni publiques desnudos. Descripción
            detallada Woordi es un reflejo de nuestra diversa comunidad de culturas, edades y
            creencias. Hemos dedicado mucho tiempo a considerar los diferentes factores que
            contribuyen a crear un entorno seguro y abierto para todos. Hemos creado las Normas
            comunitarias para que puedas ayudarnos a fomentar y proteger esta increíble comunidad.
            Al utilizar Woordi, aceptas estas condiciones y nuestras Condiciones de uso. Nosotros
            nos comprometemos a cumplir estas normas y esperamos que tú también te impliques. En
            caso de que incumplas las normas, es posible que se elimine contenido, se inhabilite la
            cuenta o se apliquen otras restricciones. Comparte solamente fotos y vídeos que hayas
            hecho o que tengas derecho a compartir. Como siempre, tú eres el propietario del
            contenido que publicas en Woordi. Recuerda publicar contenido auténtico; no publiques
            nada que hayas copiado o encontrado de internet, y que no tengas derecho a publicar.
            Obtén más información sobre los derechos de propiedad intelectual. Publica fotos y
            vídeos que resulten apropiados para una audiencia diversa. Somos conscientes de que es
            posible que algunas personas quieran compartir imágenes de desnudos de carácter
            artístico o creativo; sin embargo, por diversos motivos, no permitimos que se publiquen
            desnudos en Woordi. Esta restricción se aplica a fotos, vídeos y determinado contenido
            digital que muestren actos sexuales, genitales y primeros planos de nalgas totalmente al
            descubierto. También se aplica a algunas fotos de pezones femeninos; sin embargo, sí se
            permiten fotos de cicatrices de mastectomías y de lactancia materna. También se aceptan
            desnudos en fotos de cuadros y esculturas. A la gente le gusta compartir fotos o vídeos
            de sus hijos. Por razones de seguridad, es posible que en determinadas ocasiones
            retiremos imágenes que muestren niños total o parcialmente desnudos. Aunque este
            contenido se comparta con buena intención, otras personas podrían utilizarlo de modo
            imprevisto. Puedes obtener más información en nuestra página "Consejos para los padres".
            Fomenta interacciones relevantes y genuinas. Con el fin de ayudarnos a erradicar el
            spam, no hagas que tus Me gusta, tus seguidores o las veces que se comparte tu contenido
            aumenten de manera artificial, ni tampoco publiques comentarios o contenido repetitivos
            ni contactes de forma reiterada con personas con fines comerciales sin su
            consentimiento. No tienes que utilizar tu nombre real en Woordi, pero requerimos que los
            usuarios de la plataforma nos proporcionen información correcta y actualizada. No te
            hagas pasar por otras personas ni crees cuentas con el objetivo de infringir nuestras
            normas o engañar a los demás. Cumple la Ley. En Woordi no tienen cabida personas que
            apoyen o elogien el terrorismo, el crimen organizado o a grupos que promuevan el odio.
            Tampoco está permitido ofrecer servicios sexuales, la compraventa entre particulares de
            armas de fuego y productos relacionados con el alcohol o el tabaco ni la compraventa de
            fármacos ilegales o con receta (aunque fuese legal en tu país). Asimismo, Woordi prohíbe
            la venta de animales vivos entre particulares, aunque las tiendas con establecimiento
            físico pueden ofrecer estas ventas. Nadie puede coordinar la caza o venta de especies en
            peligro de extinción ni sus productos derivados. Recuerda cumplir en todo momento la
            legislación aplicable cuando ofrezcas comprar o vender bienes regulados. Las cuentas que
            promocionan los juegos de apuestas, los juegos de habilidad con dinero real o las
            loterías en internet deben obtener nuestro consentimiento por escrito antes de utilizar
            nuestros productos. Mostramos tolerancia cero con aquellas personas que comparten
            contenido sexual relacionado con menores o que amenazan con publicar imágenes íntimas de
            otros usuarios. Respeta al resto de los miembros de la comunidad de Woordi. Queremos
            promover una comunidad diversa y positiva. Retiramos cualquier contenido que incluya
            amenazas creíbles o lenguaje que incite al odio, contenido dirigido a particulares con
            el fin de humillarlos o avergonzarlos, información personal utilizada para chantajear o
            acosar a alguien, y mensajes reiterados no deseados. Normalmente, permitimos debates más
            críticos en torno a personas que aparecen en las noticias o que cuentan con una
            audiencia muy amplia por su profesión o por determinadas actividades. Resulta
            inaceptable fomentar el uso de la violencia o atacar a alguien por razones de raza,
            etnia, origen nacional, sexo, identidad sexual, orientación sexual, creencias
            religiosas, discapacidad o enfermedad. Cabe la posibilidad de que permitamos lenguaje
            que incite al odio si este se comparte para cuestionar este tipo de comportamientos o
            para concienciar con respecto a estos. En estos casos, te pedimos que expreses tu
            intención de forma clara. No se permiten amenazas graves para la seguridad pública y
            personal. Estas amenazas incluyen amenazas específicas contra la integridad física y
            amenazas de robo, vandalismo y otros perjuicios financieros. Revisamos meticulosamente
            las denuncias de amenazas y tenemos en cuenta muchos factores a la hora de determinar si
            son creíbles. Contribuye a mantener este entorno de ayuda y no ensalces las
            autolesiones. La comunidad de Woordi es un lugar cuyos miembros cuidan los unos de los
            otros y al que acuden personas con problemas, como trastornos alimenticios o trastornos
            que les llevan a producirse cortes u otro tipo de autolesiones, con el fin de
            concienciar al resto de los miembros o buscar apoyo. Tratamos de aportar nuestro granito
            de arena proporcionando materiales educativos en la aplicación y añadiendo información
            en el servicio de ayuda para que todo el mundo reciba la ayuda que necesita. Animar o
            instar a personas a autolesionarse va en contra de este entorno de apoyo, por lo que
            retiraremos o inhabilitaremos las cuentas que reciban denuncias en este sentido. Es
            posible que también retiremos contenido que identifique a víctimas de autolesiones si
            este se utiliza como forma de ataque o burla. Reflexiona antes de publicar eventos de
            interés. Somos conscientes de que son muchas las personas que utilizan Woordi para
            compartir eventos importantes y de interés. Algunas de estos eventos pueden incluir
            imágenes muy gráficas. Debido al gran número de personas y grupos de edad diferentes que
            utilizan Woordi, es posible que retiremos vídeos de gran violencia gráfica, con el fin
            de asegurarnos de que Woordi siga siendo apropiado para todos. Sabemos que, con
            frecuencia, este tipo de contenido se comparte para condenarlo o para concienciar al
            resto de usuarios. Si lo compartes por este motivo, te animamos a incluir un pie de foto
            que advierta de que se trata de contenido con violencia gráfica. No se permite bajo
            ningún concepto compartir imágenes gráficas de prácticas sádicas o que ensalcen la
            violencia. Ayúdanos a mantener unida la comunidad: todos y cada uno de nosotros somos
            una parte importante de la comunidad de Woordi. Si ves algo que consideras que infringe
            nuestras normas, comunícanoslo utilizando nuestra opción de denuncia integrada. Contamos
            con un equipo internacional que revisa estas denuncias y trabaja con la mayor celeridad
            posible para retirar el contenido que incumpla nuestras normas. Aunque ni tú ni alguien
            que conozcas tengáis una cuenta de Woordi, podéis enviar una denuncia. Cuando rellenes
            la denuncia, intenta facilitar toda la información que sea posible, como enlaces,
            nombres de usuario y descripciones del contenido, de tal modo que podamos encontrarlo y
            revisarlo rápidamente. Puede que eliminemos publicaciones enteras si las imágenes o sus
            subtítulos infringen nuestras normas. Puede que encuentres contenido que no te gusta
            pero que no infringe las Normas comunitarias. Si este es el caso, puedes dejar de seguir
            o bloquear a la persona que lo ha publicado. Si hay algo que no te gusta en un
            comentario de una de tus publicaciones, puedes eliminar el comentario. Muchas disputas y
            malentendidos se pueden resolver directamente entre los miembros de la comunidad. Si
            otro miembro publica una de tus fotos o uno de tus vídeos, puedes intentar pedirle que
            los retire en un comentario de la publicación. Si no funciona, puedes presentar una
            denuncia por vulneración de derechos de autor. Si crees que alguien está vulnerando tu
            marca comercial, también puedes presentar una denuncia por vulneración de marca
            comercial. No publiques capturas de pantalla ni llames la atención sobre el problema, ya
            que podría considerarse acoso. Es posible que trabajemos con las autoridades legales,
            incluido si creemos que hay riesgo físico o que supone una amenaza para la salud
            pública. Para obtener más información, visita el servicio de ayuda o consulta las
            Condiciones de uso. Gracias por ayudarnos a crear una de las mejores comunidades del
            mundo. El equipo de Woordi
          </p>
          <p>
            <b>Condiciones de uso Servicio de Woordi</b>
            <br />
            Aceptamos proporcionarte el Servicio de Woordi, que incluye todos los productos, las
            funciones, las aplicaciones, los servicios, las tecnologías y el software de Woordi que
            ofrecemos para cumplir el propósito de la plataforma, esto es, conectarte con las
            personas y las cosas que te importan. El Servicio se compone de los siguientes aspectos
            (el “Servicio”): Ofrecer oportunidades personalizadas para crear, conectarse,
            comunicarse, descubrir y compartir. Cada persona es distinta, por eso, en nuestro
            esfuerzo por contribuir a fortalecer tus relaciones, queremos hacerlo por medio de
            experiencias compartidas que de verdad te interesen. Con esta finalidad, creamos
            sistemas cuyo objetivo es intentar definir qué cosas y personas os interesan a ti y a
            otros, a fin de utilizar esa información para ayudarte a crear, encontrar y compartir
            experiencias que te sean relevantes, como también unirte a ellas. Parte de este proceso
            conlleva destacar contenido, funciones, ofertas y cuentas que podrían interesarte, así
            como ofrecerte formas de experimentar Woordi en función de lo que tú y otras personas
            hacéis tanto dentro como fuera de la plataforma. Fomentar un entorno positivo, inclusivo
            y seguro. Desarrollamos y empleamos herramientas, y ofrecemos recursos a los miembros de
            nuestra comunidad para contribuir a que vivan experiencias integradoras y positivas,
            incluso cuando creemos que pueden necesitar ayuda. También contamos con equipos y
            sistemas cuyo propósito es combatir el abuso y las infracciones de nuestras Condiciones
            y políticas, así como erradicar comportamientos dañinos y engañosos. Utilizamos toda la
            información de que disponemos, incluida la tuya, para proteger nuestra plataforma.
            Asimismo, es posible que compartamos información sobre usos incorrectos o contenido
            dañino con otras empresas de Woordi o las autoridades policiales. Obtén más
            información en la Política de datos. Desarrollar y utilizar tecnologías que nos ayuden a
            ofrecer servicios de forma continua a nuestra comunidad en constante crecimiento. Para
            ofrecer nuestro Servicio en condiciones óptimas, es fundamental organizar y analizar la
            información de nuestra creciente comunidad. Gran parte de nuestro Servicio consiste en
            crear y usar tecnologías de vanguardia que nos ayuden a personalizar, proteger y mejorar
            nuestro Servicio a gran escala, de forma que pueda estar disponible para una amplia
            comunidad internacional. Tecnologías como la inteligencia artificial y el aprendizaje
            automático nos permiten aplicar procesos complejos a todos nuestros Servicios. Estas
            tecnologías automatizadas también posibilitan que podamos garantizar la funcionalidad e
            integridad de dicho Servicio. Proporcionar experiencias coherentes y fluidas en los
            distintos Productos de las empresas de Woordi. Woordi forma parte de las empresas de
            Woordi, entre las que se comparten tecnologías, sistemas, estadísticas e información
            (incluidos datos que poseemos sobre ti; consulta la Política de datos para obtener más
            información) a fin de proporcionar servicios mejores y más seguros. También
            proporcionamos formas de interactuar con los Productos de las empresas de Woordi que
            utilizas, y disponemos de sistemas diseñados para ofrecer una experiencia coherente y
            fluida entre dichos productos. Garantizar una infraestructura internacional estable para
            proporcionar nuestro Servicio. A fin de ofrecer un Servicio internacional, debemos
            almacenar datos en nuestros sistemas de todo el mundo, así como transferir información
            entre ellos, incluidos sistemas que no se encuentran en tu país de residencia. Esta
            infraestructura puede ser propiedad de Woordi, Inc., Woordi Ireland Limited o sus
            filiales, o estar dirigida por ellas. Conectarte con marcas, productos y servicios de
            formas que te resulten relevantes. Utilizamos datos de Woordi y de otros Productos de
            las empresas de Woordi, así como de socios externos, para mostrarte anuncios, ofertas
            y otro contenido patrocinado que creemos que te puede interesar. Intentamos que este
            contenido te resulte tan relevante como el resto de las experiencias en Woordi.
            Investigar e innovar. Usamos la información de que disponemos para estudiar nuestro
            Servicio y colaborar con otras partes en la realización de investigaciones que nos
            permitan mejorar dicho servicio y contribuir al bienestar de nuestra comunidad. Política
            de datos Para proporcionar nuestro Servicio, debemos recopilar y usar tu información. En
            la Política de datos se explica cómo recopilamos, usamos y compartimos información en
            los Productos de Woordi. También se detallan las formas en que puedes controlar tu
            información, por ejemplo, desde la configuración de seguridad y privacidad de Woordi.
            Compromisos que asumes Nosotros te proporcionamos el Servicio a cambio de que asumas los
            siguientes compromisos. Quién puede usar Woordi. Queremos que nuestro Servicio sea lo
            más inclusivo y abierto posible, pero también que sea seguro y conforme a la ley. Por
            este motivo, si quieres formar parte de la comunidad de Woordi, es necesario que aceptes
            algunas restricciones: Debes tener al menos 14 años, o la edad mínima legal en tu país.
            No debes tener antecedentes que indiquen que se te ha prohibido utilizar algún aspecto
            de nuestro Servicio en virtud de la legislación aplicable o usar servicios relacionados
            con los pagos si apareces en una lista de personas o empresas con las que el comercio
            esté prohibido o restringido ("denied party listing). Tu cuenta no debe haberse
            inhabilitado anteriormente a causa de una infracción de la ley o de cualquiera de
            nuestras políticas. No puedes haber sido condenado por delitos sexuales. Restricciones
            en cuanto al uso de Woordi. Todos debemos poner de nuestra parte para que la comunidad
            cuente con un Servicio abierto y seguro. No te hagas pasar por otra persona ni nos
            proporciones información incorrecta. No es necesario que reveles tu identidad en Woordi.
            No obstante, debes facilitarnos información precisa y actualizada (incluida la
            información de registro). Asimismo, no puedes hacerte pasar por otra persona ni crear
            una cuenta en nombre de alguien más (a menos que cuentes con su permiso expreso). No
            realices actividades ilegales, engañosas o fraudulentas, ni con fines ilegales o no
            autorizados. No puedes infringir estas Condiciones ni nuestras políticas (ni ayudar o
            animar a otras personas a hacerlo), especialmente las Normas comunitarias de Woordi, la
            Política de la plataforma de Woordi y las Normas de contenido musical. Puedes obtener
            información sobre cómo denunciar comportamientos o contenido inapropiados en nuestro
            servicio de ayuda. No realices ninguna acción que interfiera con el Servicio o impida
            que funcione como está previsto. No intentes recopilar información o acceder a ella, ni
            crear cuentas valiéndote de medios no autorizados. Esto incluye crear cuentas o
            recopilar información de un modo automatizado sin nuestro permiso expreso. No intentes
            comprar, vender o transferir ninguna parte de tu cuenta (incluido el nombre de usuario)
            ni solicitar, recopilar o usar credenciales de inicio de sesión o insignias de otros
            usuarios. No publiques contenido privado o confidencial de ninguna persona, ni lleves a
            cabo ninguna actividad que infrinja los derechos de otra persona, incluidos sus derechos
            de propiedad intelectual o industrial. Aquí te explicamos cómo denunciar contenido que
            creas que infringe tus derechos de propiedad intelectual o industrial. No utilices un
            nombre de dominio o URL en tu nombre de usuario sin nuestro consentimiento previo por
            escrito. Permisos que nos concedes. Como parte de nuestro acuerdo, también nos concedes
            los permisos necesarios para proporcionarte el Servicio. No reclamamos la propiedad de
            tu contenido, sino que nos concedes una licencia para usarlo. Tus derechos sobre el
            contenido no cambiarán. No reclamamos la propiedad del contenido que publicas en el
            Servicio o a través de este. En lugar de ello, cuando compartes, publicas o subes
            contenido que se encuentra protegido por derechos de propiedad intelectual (como fotos o
            vídeos) en nuestro Servicio, o en relación con este, de conformidad con el presente
            acuerdo nos concedes una licencia mundial, no exclusiva, transferible, sublicenciable y
            exenta de pagos por derechos de autor para alojar, distribuir, modificar, mantener,
            reproducir, mostrar o comunicar públicamente y traducir tu contenido, así como para
            crear contenido derivado (de conformidad con tu configuración de privacidad y de la
            aplicación). Puedes eliminar el contenido o tu cuenta en cualquier momento para dar por
            finalizada esta licencia. No obstante, el contenido seguirá siendo visible si lo has
            compartido con otras personas y estas no lo han eliminado. Puedes encontrar más
            información sobre el uso que hacemos de la información y cómo controlar o eliminar tu
            contenido en la Política de datos y el servicio de ayuda de Woordi. Permiso para usar tu
            nombre de usuario, tu foto del perfil e información sobre tus relaciones y las acciones
            que realizas en cuentas, anuncios y contenido patrocinado. Nos concedes permiso para
            mostrar tu nombre de usuario, tu foto del perfil e información sobre las acciones que
            realizas (como los “Me gusta”) o tus relaciones (como los seguidores) junto a cuentas,
            anuncios, ofertas y otro contenido patrocinado (o en relación con ellos) que sigues o
            con los que interactúas y que se muestran en los Productos de Woordi, sin obtener
            compensación alguna a cambio. Por ejemplo, podemos mostrar que te gusta una publicación
            patrocinada creada por una marca que nos ha pagado para que mostremos sus anuncios en
            Woordi. Del mismo modo que ocurre con los seguidores de otras cuentas y las acciones
            realizadas en otro contenido, solo las personas que tengan permiso para ver dicho
            contenido o dichos seguidores podrán ver los seguidores de cuentas patrocinadas y las
            acciones efectuadas en contenido patrocinado. También respetaremos tu configuración de
            anuncios. Obtén más información sobre la configuración de anuncios aquí. Aceptas que
            podemos descargar e instalar actualizaciones del Servicio en tu dispositivo. Derechos
            adicionales que nos reservamos Si seleccionas un nombre de usuario o identificador
            similar para tu cuenta, nos reservamos el derecho a cambiarlo si lo consideramos
            necesario o conveniente (por ejemplo, si infringe los derechos de propiedad intelectual
            o industrial de otra persona o sirve para hacerte pasar por otro usuario). Nos
            reservamos todos los derechos respecto del contenido protegido por derechos de propiedad
            intelectual o industrial (de nuestra pertenencia) que ponemos a disposición en nuestro
            Servicio (como imágenes, diseños, vídeos o sonido que ofrecemos) y que tú añades al
            contenido que creas o compartes. Tú conservarás los derechos de propiedad intelectual o
            industrial relativos a tu contenido. Solo puedes usar nuestro contenido sujeto a
            propiedad intelectual o industrial, o nuestras marcas comerciales o similares según lo
            establecido en nuestras Normas de uso de marcas, o bien con nuestro consentimiento por
            escrito. Debes obtener nuestro permiso por escrito o contar con permiso en virtud de una
            licencia de código abierto para modificar, descompilar o intentar extraer de algún otro
            modo nuestro código fuente, así como para crear obras derivadas a partir de él.
            Eliminación de contenido, e inhabilitación o cancelación de la cuenta Podemos eliminar
            cualquier contenido o información que compartas en el Servicio si consideramos que
            infringe estas Condiciones de uso o nuestras políticas (incluidas nuestras Normas
            comunitarias de Woordi), o si la ley así lo exige. Podemos negarnos a proporcionarte o
            dejar de proporcionarte la totalidad o una parte del Servicio (incluidas la
            inhabilitación o cancelación de tu cuenta) de inmediato si: infringes de forma clara,
            grave o reiterada estas Condiciones de uso, incluidas nuestras Normas comunitarias de
            Woordi; si infringes reiteradamente los derechos de propiedad intelectual de otras
            personas; o si la ley nos obliga a ello. Según corresponda, te notificaremos en caso de
            llevar a cabo acciones para la eliminación de tu contenido, o la inhabilitación o
            cancelación de tu cuenta, como consecuencia de la infracción de nuestras Normas
            comunitarias. Si consideras que tu cuenta se ha cancelado por error, o quieres
            inhabilitarla o eliminarla de forma definitiva, consulta nuestro servicio de ayuda. Es
            posible que el contenido que elimines se conserve durante un tiempo limitado en copias
            de seguridad, y seguirá siendo visible si otras personas lo han compartido en otros
            sitios. Este párrafo y la sección “Nuestro acuerdo y qué ocurre si no aceptamos alguna
            disposición”, que figura a continuación, seguirán en vigor una vez eliminada o cancelada
            tu cuenta. Nuestro acuerdo y qué ocurre si se produce una disputa Nuestro acuerdo. Si
            incluyes contenido de música en el Servicio, este quedará sujeto a nuestras Normas de
            contenido musical. En caso de que utilices nuestras API, deberás cumplir nuestra
            Política de la plataforma. Para poder hacer uso de determinadas funciones o servicios
            relacionados, deberás aceptar condiciones adicionales, que entrarán a formar parte de
            nuestro acuerdo. Por ejemplo, si utilizas funciones de pago, se te pedirá que aceptes
            las Condiciones de pago de la comunidad. Si alguna de esas condiciones entra en
            conflicto con este acuerdo, prevalecerán dichas condiciones. Si cualquier parte de este
            acuerdo no fuese válida, la parte restante seguirá siendo aplicable. Cualquier enmienda
            o renuncia a nuestro acuerdo deberá hacerse por escrito y contar con nuestra firma. Si
            no hiciésemos cumplir alguna parte de este acuerdo, no se considerará una renuncia por
            nuestra parte. Nos reservamos todos los derechos que no te hayamos cedido de forma
            expresa. Quién es titular de los derechos en virtud de este acuerdo. Este acuerdo no
            asigna derechos a terceros. No puedes transferir ninguno de tus derechos u obligaciones
            en virtud de este acuerdo sin nuestro consentimiento. Nuestros derechos y obligaciones
            pueden asignarse a otras partes, por ejemplo, en caso de producirse un cambio de
            titularidad (es decir, si se efectúa una fusión, adquisición o venta de activos) o si la
            ley así lo exige. Quién asume la responsabilidad si ocurre algo. Actuaremos con cuidado
            y destreza razonables a la hora de proporcionarte nuestro Servicio y mantener un entorno
            seguro y exento de errores. No obstante, no podemos garantizar que nuestro Servicio
            funcione siempre sin interrupciones, retrasos o imperfecciones. Siempre que hayamos
            actuado con cuidado y destreza razonables, no asumimos responsabilidad alguna por:
            pérdidas no provocadas por la infracción por nuestra parte de estas Condiciones o como
            consecuencia de nuestras acciones; pérdidas que ni tú ni nosotros podamos prever de
            forma razonable en el momento de aceptar estas Condiciones; contenido publicado por
            otras personas que sea ofensivo, inapropiado, obsceno, ilegal o cuestionable de algún
            otro modo y que puedas encontrar en nuestro Servicio; y eventos que escapen de forma
            razonable a nuestro control. La disposición anterior no nos exime de responsabilidad ni
            la limita en casos de defunción, lesiones personales o representación fraudulenta
            derivados de una negligencia por nuestra parte, como tampoco en cualquier otra
            circunstancia en que la ley no lo permita. Cómo resolveremos las disputas. Si eres
            consumidor y resides habitualmente en un estado miembro de la Unión Europea, las leyes
            de dicho país se aplicarán a cualquier reclamación, causa o disputa que inicies contra
            nosotros y que surja como consecuencia de estas Condiciones o en relación con ellas
            (“reclamación”). Asimismo, puedes resolver la reclamación en cualquier tribunal
            competente del país que tenga jurisdicción. En todos los demás casos, aceptas que la
            reclamación debe resolverse en un tribunal competente en la República de Irlanda y que
            las leyes de dicho país regirán estas Condiciones y cualquier reclamación
            (independientemente de las disposiciones relativas a conflictos de derecho). Material no
            solicitado. Los comentarios y las sugerencias son siempre bienvenidos. No obstante,
            podemos usarlos sin restricción alguna ni obligación de compensarte por ellos. Tampoco
            tenemos el deber de considerarlos confidenciales. Actualización de estas Condiciones Es
            posible que modifiquemos nuestro Servicio y nuestras políticas y, en consecuencia, que
            debamos actualizar estas Condiciones para que reflejen dichos Servicios y dichas
            políticas con precisión. A menos que la ley disponga lo contrario, te enviaremos una
            notificación (por ejemplo, mediante nuestro Servicio) con 30 días de antelación como
            mínimo antes de modificar estas Condiciones, de modo que puedas consultar los cambios
            antes de que entren en vigor. El uso del Servicio después de esta fecha supondrá la
            aceptación de las modificaciones efectuadas. Si no quieres aceptar estas disposiciones o
            las Condiciones actualizadas, puedes eliminar tu cuenta aquí.{' '}
            El Articulo 55 describe y determina indiscutiblemente la "responsabilidad", "relacion", "vinculo" entre Woordi y sus usuarios ( Redactores o lectores ).
          </p>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCond);
