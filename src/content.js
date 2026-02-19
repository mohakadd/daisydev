import { map_data } from './map_data.js';

export const content = {
    global: {
        nav: {
            home: "Accueil",
            project: "Notre Programme",
            team: "Notre Équipe",
            contact: "Contact",
            join: "Nous rejoindre",
            donate: "Faire un don",
            proxy: "Procuration",
            cta: "Nous rejoindre"
        },
        footer: {
            copyright: "© 2026 Daisy Yaïch - Cergy en Commun | Élections municipales - 15 et 22 mars 2026",
            legal: "Mentions légales"
        }
    },
    team: {
        title: "Notre Équipe",
        intro: "Découvrez les femmes et les hommes qui s'engagent à vos côtés pour Cergy.",
        list: [
            {
                name: "Daisy Yaïch",
                role: "Tête de liste",
                desc: "Candidate aux élections municipales."
            },
            {
                name: "Rejoignez-nous !",
                role: "",
                desc: "Vous souhaitez faire partie de l'équipe ? Contactez-nous !"
            }
        ]
    },
    home: {
        hero: {
            title: "Cergy en Commun 2026",
            subtitle: "Avec Daisy Yaïch, redonnons le pouvoir aux Cergyssois"
        },
        bio: {
            title: "Daisy Yaïch",
            text: "Candidate aux élections municipales des 15 et 22 mars 2026 à Cergy. Tête de liste de Cergy en commun portée par la France insoumise",
            cta: "Découvrir la candidate"
        },
        priorities: {
            title: "Nos 4 Priorités",
            p1: {
                title: "Soigner Cergy",
                text: "Création d’une maison municipale de santé avec médecins et spécialistes recrutés directement par la ville, sans dépassements d’honoraires."
            },
            p2: {
                title: "Réussir à l’école",
                text: "Gratuité des fournitures scolaires du CP au CM2, mise en place d’une cantine municipale qui redonne la priorité à ce que mangent nos enfants, refonte du projet éducatif sur le temps périscolaire, co-construit avec nos associations, plan de rénovation et de végétalisation des groupes scolaires."
            },
            p3: {
                title: "Vivre mieux dans nos quartiers",
                text: "Accompagnement des habitantes et habitants dans la bataille face aux bailleurs pour des loyers justes et un habitat digne, des transports réguliers et accessibles, des espaces publics propres et entretenus."
            },
            p4: {
                title: "Rassurer et sécuriser par la proximité",
                text: "Renforcement du lien population-police, des médiateurs formés et présents dans les quartiers, une politique de prévention volontariste."
            },
            cta: "Découvrir le programme complet"
        }
    },
    candidate: {
        title: "La Candidate & Le Projet",
        bio: {
            title: "Qui est Daisy Yaïch ?",
            p1: "Militante engagée et figure locale de Cergy, Daisy Yaïch porte les couleurs de la France Insoumise et de l'Union Populaire. Elle défend une vision d'une ville qui protège ses habitants et prépare l'avenir face au défi climatique.",
            p2: "Cergy en commun est le groupe d'action local de la France Insoumise à Cergy. Nous construisons une alternative citoyenne autour du programme de l'Avenir en commun qui rassemble les forces vives du territoire."
        },
        program: {
            title: "Notre Vision pour Cergy",
            items: [
                {
                    title: "Soigner Cergy",
                    text: "Création d’une maison municipale de santé avec médecins et spécialistes recrutés directement par la ville, sans dépassements d’honoraires.",
                    color: "var(--color-red)"
                },
                {
                    title: "Réussir à l’école",
                    text: "Gratuité des fournitures scolaires du CP au CM2, mise en place d’une cantine municipale qui redonne la priorité à ce que mangent nos enfants, refonte du projet éducatif sur le temps périscolaire, co-construit avec nos associations, plan de rénovation et de végétalisation des groupes scolaires.",
                    color: "var(--color-yellow)"
                },
                {
                    title: "Vivre mieux dans nos quartiers",
                    text: "Accompagnement des habitantes et habitants dans la bataille face aux bailleurs pour des loyers justes et un habitat digne, des transports réguliers et accessibles, des espaces publics propres et entretenus.",
                    color: "var(--color-green)"
                },
                {
                    title: "Rassurer et sécuriser par la proximité",
                    text: "Renforcement du lien population-police, des médiateurs formés et présents dans les quartiers, une politique de prévention volontariste.",
                    color: "var(--color-purple)"
                }
            ]
        }
    },
    contact: {
        title: "Contact",
        form: {
            title: "Nous écrire",
            nom: "Nom",
            email: "Adresse e-mail",
            sujet: "Sujet",
            message: "Message",
            submit: "Envoyer"
        },
        social: {
            title: "Suivez Daisy"
        }
    },
    proxy: {
        form: {
            title: "Je donne ma procuration"
        }
    },
    join: {
        title: "Nous rejoindre",
        intro: "Rejoindre la dynamique insoumise sur le terrain à Cergy.",
        form: {
            title: "Rejoindre Cergy en commun",
            prenom: "Prénom",
            nom: "Nom",
            email: "Adresse e-mail",
            telephone: "Numéro de téléphone",
            adresse: "Adresse (lieu de résidence)",
            age: "Âge",
            action_populaire: "Es-tu déjà inscrit·e sur Action Populaire ?",
            implication: "Comment souhaites-tu t'impliquer ?",
            experience: "As-tu une expérience militante ?",
            competences: "As-tu des compétences à partager ?",
            motivation: "Un petit mot pour te présenter ou nous dire pourquoi tu nous rejoins ?",
            consent: "J'accepte que mes données soient utilisées pour me recontacter dans le cadre de la campagne municipale.",
            submit: "Envoyer"
        }
    },
    map_data: map_data
};
